import test, { APIRequestContext } from '@playwright/test';
import { createApiContextFromStorageState } from '../../helpers/generateApiContext';
import { ExerciseHelper } from '../../helpers/exerciseHelper';
import { WorkoutHelper } from '../../helpers/workoutHelper';
import { WorkoutPage } from '../../pages/workout.page';
import { MyTrainingPage } from '../../pages/my-training.page';
import { RoutineHelper } from '../../helpers/routineHelper';
import { barbellCurlWorkout, sandbagLoadWorkout } from '../../test-data/workout.data';
import { strengthStabilityRoutine } from '../../test-data/routine.data';
import { RoutinesPage } from '../../pages/routines.page';
import { RoutineDetailsPage } from '../../pages/routine-details.page';
import { WorkoutFormPage } from '../../pages/workout-form.page';
import { addDays, formatDateDDMMYYY } from '../../helpers/dateHelper';
import { DataTestManager } from '../../helpers/dataTestManager';

test.describe('User with existing workouts', async () => {
  let apiContext: APIRequestContext;
  let workoutPage: WorkoutPage;
  let myTrainingPage: MyTrainingPage;
  let dataTestManager: DataTestManager;

  test.beforeAll(async () => {
    apiContext = await createApiContextFromStorageState('./e2e/.auth/user.json');
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test.beforeEach(async ({ page }) => {
    workoutPage = new WorkoutPage(page);
    myTrainingPage = new MyTrainingPage(page);
    dataTestManager = new DataTestManager();
  });

  test.afterEach(async () => {
    await dataTestManager.cleanup();
  });

  test('can delete workout', async () => {
    const workoutHelper = new WorkoutHelper(apiContext);
    const exerciseHelper = new ExerciseHelper(apiContext);
    const routineHelper = new RoutineHelper(apiContext);
    const routineName = strengthStabilityRoutine.name;
    const routineDesc = strengthStabilityRoutine.description;
    const exerciseName = sandbagLoadWorkout.exerciseName;

    const exercise = await exerciseHelper.getExerciseByName(exerciseName);
    // Create workout but do not register automatic workout cleanup
    const registerCleanup = false;
    const workout = await workoutHelper.createWorkoutAndRoutine(
      routineName,
      routineDesc,
      exercise,
      '',
      dataTestManager,
      registerCleanup,
    );
    // Register cleanup for routine only
    await routineHelper.registerRoutineCleanup(workout.routineId, dataTestManager);

    await workoutPage.goto(workout.id);
    await workoutPage.expectHeadingToBeVisible();

    await workoutPage.deleteWorkout();
    await myTrainingPage.expectToBeOnMyTrainingPage();
    await myTrainingPage.expectListIsEmpty();
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
    // Create workout and register automatic cleanup
    const registerCleanup = true;
    const workout = await workoutHelper.createWorkoutAndRoutine(
      routineName,
      routineDesc,
      exercise,
      '',
      dataTestManager,
      registerCleanup,
    );

    await workoutPage.goto(workout.id);
    await workoutPage.expectHeadingToBeVisible();

    await workoutPage.updateWorkoutName(sandbagLoadWorkout.name);
    await workoutPage.updateWorkoutComment(sandbagLoadWorkout.comment);
    await workoutPage.removeSetFromExercise(exerciseName, exerciseSetToBeRemoved);

    await workoutPage.saveWorkout();
    await workoutPage.expectSaveSuccessAlert();

    await workoutPage.expectNameToBe(sandbagLoadWorkout.name);
    await workoutPage.expectCommentToBe(sandbagLoadWorkout.comment);
    await workoutPage.expectExerciseToHaveSetCount(exerciseName, updatedSetCount);
  });
});

test.describe('User with no workouts', async () => {
  let apiContext: APIRequestContext;
  let routinePage: RoutinesPage;
  let routineDetailsPage: RoutineDetailsPage;
  let workoutPage: WorkoutPage;
  let workoutFormPage: WorkoutFormPage;
  let dataTestManager: DataTestManager;

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
    dataTestManager = new DataTestManager();
  });

  test.afterEach(async () => {
    await dataTestManager.cleanup();
  });

  test('creates workout from existing routine and verifies updated data', async () => {
    const routineHelper = new RoutineHelper(apiContext);
    const workoutHelper = new WorkoutHelper(apiContext);
    const routineName = strengthStabilityRoutine.name;
    const routineDesc = strengthStabilityRoutine.description;

    const today = formatDateDDMMYYY(new Date());
    const tomorrow = formatDateDDMMYYY(addDays(new Date(), 1));

    // Create routine and register routine cleanup
    const registerCleanup = true;
    const { routine, exercises } = await routineHelper.createRoutineWithExercises(
      routineName,
      routineDesc,
      2,
      dataTestManager,
      registerCleanup,
    );

    await routinePage.goto();
    await routinePage.expectHeadingToBeVisible();

    await routinePage.goToRoutineDetails();
    await routineDetailsPage.startWorkout();
    await workoutFormPage.validateWorkoutForm(today, routine.name, '', exercises);

    await workoutFormPage.updateDate(tomorrow);
    await workoutFormPage.updateWorkoutName(barbellCurlWorkout.name);
    await workoutFormPage.updateWorkoutComment(barbellCurlWorkout.comment);

    const workoutId = await workoutFormPage.createWorkoutAndGetWorkoutId();
    await workoutHelper.registerWorkoutCleanup(workoutId, dataTestManager);

    await workoutPage.expectToBeOnWorkoutPage(workoutId);
    await workoutPage.validateWorkoutData(tomorrow, barbellCurlWorkout.name, barbellCurlWorkout.comment, exercises);
  });
});
