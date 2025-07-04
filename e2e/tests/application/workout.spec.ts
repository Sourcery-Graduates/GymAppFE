import test, { APIRequestContext } from '@playwright/test';
import { createApiContextFromStorageState } from '../../helpers/generateApiContext';
import { ExerciseHelper } from '../../helpers/exerciseHelper';
import { WorkoutHelper } from '../../helpers/workoutHelper';
import { WorkoutPage } from '../../pages/workout/workout.page';
import { MyTrainingPage } from '../../pages/my-training.page';
import { RoutineHelper } from '../../helpers/routineHelper';
import { barbellCurlWorkout, sandbagLoadWorkout } from '../../test-data/workout.data';
import { strengthStabilityRoutine } from '../../test-data/routine.data';
import { RoutinesPage } from '../../pages/routines.page';
import { WorkoutFormPage } from '../../pages/workout/workout-form.page';
import { addDays, formatDateDDMMYYY } from '../../helpers/dateHelper';

test.describe('User with existing workouts', async () => {
  let apiContext: APIRequestContext;
  let workoutPage: WorkoutPage;
  let myTrainingPage: MyTrainingPage;

  test.beforeAll(async () => {
    apiContext = await createApiContextFromStorageState('./e2e/.auth/user.json');
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test.beforeEach(async ({ page }) => {
    myTrainingPage = new MyTrainingPage(page);
  });

  test('can delete workout', async ({ page }) => {
    const workoutHelper = new WorkoutHelper(apiContext);
    const exerciseHelper = new ExerciseHelper(apiContext);
    const routineHelper = new RoutineHelper(apiContext);
    const routineName = strengthStabilityRoutine.name;
    const routineDesc = strengthStabilityRoutine.description;
    const exerciseName = sandbagLoadWorkout.exerciseName;

    const exercise = await exerciseHelper.getExerciseByName(exerciseName);
    const workout = await workoutHelper.createWorkout(routineName, routineDesc, exercise);
    workoutPage = new WorkoutPage(page, workout.id);
    await workoutPage.goto();
    await workoutPage.expectHeadingToBeVisible();

    await workoutPage.deleteWorkout();
    await myTrainingPage.expectToBeOnMyTrainingPage();
    await myTrainingPage.expectListIsEmpty();

    await routineHelper.deleteRoutine(workout.routineId);
  });

  test('can edit workout', async ({ page }) => {
    const workoutHelper = new WorkoutHelper(apiContext);
    const exerciseHelper = new ExerciseHelper(apiContext);
    const routineName = strengthStabilityRoutine.name;
    const routineDesc = strengthStabilityRoutine.description;
    const exerciseName = sandbagLoadWorkout.exerciseName;
    const exerciseSetToBeRemoved = 1;
    const updatedSetCount = 2;

    const exercise = await exerciseHelper.getExerciseByName(exerciseName);
    const workout = await workoutHelper.createWorkout(routineName, routineDesc, exercise);
    workoutPage = new WorkoutPage(page, workout.id);
    await workoutPage.goto();
    await workoutPage.expectHeadingToBeVisible();

    await workoutPage.updateWorkoutName(sandbagLoadWorkout.name);
    await workoutPage.updateWorkoutComment(sandbagLoadWorkout.comment);
    await workoutPage.removeSetFromExercise(exerciseName, exerciseSetToBeRemoved);

    await workoutPage.saveWorkout();
    await workoutPage.expectSaveSuccessAlert();

    await workoutPage.expectNameToBe(sandbagLoadWorkout.name);
    await workoutPage.expectCommentToBe(sandbagLoadWorkout.comment);
    await workoutPage.expectExerciseToHaveSetCount(exerciseName, updatedSetCount);

    await workoutHelper.deleteWorkout(workout.id, workout.routineId);
  });
});

test.describe('User with no workouts', async () => {
  let apiContext: APIRequestContext;
  let routinePage: RoutinesPage;
  let workoutPage: WorkoutPage;
  let workoutFormPage: WorkoutFormPage;

  test.beforeAll(async () => {
    apiContext = await createApiContextFromStorageState('./e2e/.auth/user.json');
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test.beforeEach(async ({ page }) => {
    routinePage = new RoutinesPage(page);
    workoutFormPage = new WorkoutFormPage(page);
  });

  test('creates workout from existing routine and verifies updated data', async ({ page }) => {
    const routineHelper = new RoutineHelper(apiContext);
    const workoutHelper = new WorkoutHelper(apiContext);
    const routineName = strengthStabilityRoutine.name;
    const routineDesc = strengthStabilityRoutine.description;

    const today = formatDateDDMMYYY(new Date());
    const tomorrow = formatDateDDMMYYY(addDays(new Date(), 1));

    const { routine, exercises } = await routineHelper.createRoutineWithExercises(routineName, routineDesc, 2);
    await routinePage.goto();
    await routinePage.expectHeadingToBeVisible();

    const routineDetailsPage = await routinePage.goToRoutineDetailsPage(routine.id);
    await routineDetailsPage.startWorkout();
    await workoutFormPage.validateWorkoutForm(today, routine.name, '', exercises);

    await workoutFormPage.expectToHaveURL();
    await workoutFormPage.updateDate(tomorrow);
    await workoutFormPage.updateWorkoutName(barbellCurlWorkout.name);
    await workoutFormPage.updateWorkoutComment(barbellCurlWorkout.comment);

    const workoutId = await workoutFormPage.createWorkoutAndGetWorkoutId();
    workoutPage = new WorkoutPage(page, workoutId);
    await workoutPage.expectToHaveURL();
    await workoutPage.validateWorkoutData(tomorrow, barbellCurlWorkout.name, barbellCurlWorkout.comment, exercises);

    await workoutHelper.deleteWorkout(workoutId, routine.id);
  });
});
