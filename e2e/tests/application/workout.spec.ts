import test, { APIRequestContext } from '@playwright/test';
import { createApiContextFromStorageState } from '../../helpers/generateApiContext';
import { ExerciseHelper } from '../../helpers/exerciseHelper';
import { WorkoutHelper } from '../../helpers/workoutHelper';
import { WorkoutPage } from '../../pages/workout.page';
import { MyTrainingPage } from '../../pages/my-training.page';
import { RoutineHelper } from '../../helpers/routineHelper';
import { sandbagLoadWorkout } from '../../test-data/workout.data';
import { strengthStabilityRoutine } from '../../test-data/routine.data';
import { RoutinesPage } from '../../pages/routines.page';
import { RoutineDetailsPage } from '../../pages/routine-details.page';
import { WorkoutFormPage } from '../../pages/workout-form.page';

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
    workoutPage = new WorkoutPage(page);
    myTrainingPage = new MyTrainingPage(page);
  });

  test('can delete workout', async () => {
    const workoutHelper = new WorkoutHelper(apiContext);
    const exerciseHelper = new ExerciseHelper(apiContext);
    const routineHelper = new RoutineHelper(apiContext);
    const routineName = strengthStabilityRoutine.name;
    const routineDesc = strengthStabilityRoutine.description;
    const exerciseName = sandbagLoadWorkout.exerciseName;

    const exercise = await exerciseHelper.getExerciseByName(exerciseName);
    const workout = await workoutHelper.createWorkout(routineName, routineDesc, exercise);
    await workoutPage.goto(workout.id);
    await workoutPage.expectHeadingToBeVisible();

    await workoutPage.deleteWorkout();
    await myTrainingPage.expectToBeOnMyTrainingPage();
    await myTrainingPage.expectListIsEmpty();

    await routineHelper.deleteRoutine(workout.routineId);
  });

  test('can edit workout', async () => {
    const workoutHelper = new WorkoutHelper(apiContext);
    const exerciseHelper = new ExerciseHelper(apiContext);
    const routineName = strengthStabilityRoutine.name;
    const routineDesc = strengthStabilityRoutine.description;
    const exerciseName = sandbagLoadWorkout.exerciseName;
    const exerciseSetToBeRemoved = 1;
    const updatedSetCount = 2;

    const exercise = await exerciseHelper.getExerciseByName(exerciseName);
    const workout = await workoutHelper.createWorkout(routineName, routineDesc, exercise);
    await workoutPage.goto(workout.id);
    await workoutPage.expectHeadingToBeVisible();

    await workoutPage.updateWorkoutName(sandbagLoadWorkout.name);
    await workoutPage.updateWorkoutComment(sandbagLoadWorkout.comment);
    await workoutPage.removeSetFromExercise(exerciseName, exerciseSetToBeRemoved);

    await workoutPage.saveWorkout();
    await workoutPage.expectSaveSuccessAlert();

    await workoutPage.expectNameToBeUpdated(sandbagLoadWorkout.name);
    await workoutPage.expectCommentToBeUpdated(sandbagLoadWorkout.comment);
    await workoutPage.expectExerciseToHaveSetCount(exerciseName, updatedSetCount);

    await workoutHelper.deleteWorkout(workout.id, workout.routineId);
  });
});

test.describe('User with no workouts', async () => {
  let apiContext: APIRequestContext;
  let routinePage: RoutinesPage;
  let routineDetailsPage: RoutineDetailsPage;
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
    routineDetailsPage = new RoutineDetailsPage(page);
    workoutPage = new WorkoutPage(page);
    workoutFormPage = new WorkoutFormPage(page);
  });

  test.only('can create workout from existing routine', async () => {
    const routineHelper = new RoutineHelper(apiContext);
    const exerciseHelper = new ExerciseHelper(apiContext);
    const routineName = strengthStabilityRoutine.name;
    const routineDesc = strengthStabilityRoutine.description;
    const today = new Date().toLocaleDateString('en-GB');

    const exercises = await exerciseHelper.getGivenNumberOfExercises(2);
    const routine = await routineHelper.createRoutine(routineName, routineDesc);
    await exerciseHelper.addExercisesToRoutine(routine.id, exercises);
    await routinePage.goto();
    await routinePage.expectHeadingToBeVisible();

    await routinePage.goToRoutineDetails();
    await routineDetailsPage.startWorkout();

    await workoutFormPage.expectHeadingToBeVisible();
    await workoutFormPage.expectDateToBe(today);
    await workoutFormPage.expectNameToBe(routineName);
    await workoutFormPage.expectCommentToBe('');
    await workoutFormPage.expectWorkoutContainsExercises(exercises);

    // await workoutHelper.deleteWorkout(workout.id, workout.routineId);
  });
});
