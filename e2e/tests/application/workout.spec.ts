import test, { APIRequestContext } from '@playwright/test';
import { createApiContextFromStorageState } from '../../helpers/generateApiContext';
import { ExerciseHelper } from '../../helpers/exerciseHelper';
import { WorkoutHelper } from '../../helpers/workoutHelper';
import { WorkoutPage } from '../../pages/workout/workout.page';
import { MyTrainingPage } from '../../pages/my-training.page';
import { barbellCurlWorkout, sandbagLoadWorkout } from '../../test-data/workout.data';
import { RoutinesPage } from '../../pages/routines.page';
import { WorkoutFormPage } from '../../pages/workout/workout-form.page';
import { addDays, formatDateDDMMYYY } from '../../helpers/dateHelper';
import { DataTestManager } from '../../test-utils/dataTestManager';
import { RoutineFactory } from '../../factories/routine.factory';

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
    myTrainingPage = new MyTrainingPage(page);
    dataTestManager = new DataTestManager();
  });

  test.afterEach(async () => {
    await dataTestManager.cleanup();
  });

  test('can delete workout', async ({ page }) => {
    const workoutHelper = new WorkoutHelper(apiContext);
    const exerciseHelper = new ExerciseHelper(apiContext);
    const routine = await RoutineFactory.init(apiContext, dataTestManager).create();
    const exerciseName = sandbagLoadWorkout.exerciseName;
    const exercise = await exerciseHelper.getExerciseByName(exerciseName);

    // Create workout but do not register automatic workout cleanup
    const workout = await workoutHelper.createWorkout(routine.name, routine.id, exercise, '');

    workoutPage = new WorkoutPage(page, workout.id);
    await workoutPage.goto();
    await workoutPage.expectHeadingToBeVisible();

    await workoutPage.deleteWorkout();
    await myTrainingPage.expectToBeOnMyTrainingPage();
    await myTrainingPage.expectListIsEmpty();
  });

  test('can edit workout', async ({ page }) => {
    const workoutHelper = new WorkoutHelper(apiContext);
    const exerciseHelper = new ExerciseHelper(apiContext);
    const routine = await RoutineFactory.init(apiContext, dataTestManager).create();
    const exerciseName = sandbagLoadWorkout.exerciseName;
    const exercise = await exerciseHelper.getExerciseByName(exerciseName);
    const exerciseSetToBeRemoved = 1;
    const updatedSetCount = 2;

    const workout = await workoutHelper.createWorkoutAndRegisterCleanup(
      routine.name,
      routine.id,
      exercise,
      '',
      dataTestManager,
    );

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
  });
});

test.describe('User with no workouts', async () => {
  let apiContext: APIRequestContext;
  let routinePage: RoutinesPage;
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
    workoutFormPage = new WorkoutFormPage(page);
    dataTestManager = new DataTestManager();
  });

  test.afterEach(async () => {
    await dataTestManager.cleanup();
  });

  test('creates workout from existing routine and verifies updated data', async ({ page }) => {
    const workoutHelper = new WorkoutHelper(apiContext);
    const today = formatDateDDMMYYY(new Date());
    const tomorrow = formatDateDDMMYYY(addDays(new Date(), 1));

    const { routine, exercises } = await RoutineFactory.init(apiContext, dataTestManager).createWithExercises(2);
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
    await workoutHelper.registerWorkoutCleanup(workoutId, dataTestManager);

    workoutPage = new WorkoutPage(page, workoutId);
    await workoutPage.expectToHaveURL();
    await workoutPage.validateWorkoutData(tomorrow, barbellCurlWorkout.name, barbellCurlWorkout.comment, exercises);
  });
});
