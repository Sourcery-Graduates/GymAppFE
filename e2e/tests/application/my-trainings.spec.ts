import test, { APIRequestContext } from '@playwright/test';
import { MyTrainingPage } from '../../pages/my-training.page';
import { createApiContextFromStorageState } from '../../helpers/generateApiContext';
import { WorkoutHelper } from '../../helpers/workoutHelper';
import { ExerciseHelper } from '../../helpers/exerciseHelper';
import { DataTestManager } from '../../test-utils/dataTestManager';
import { RoutineFactory } from '../../factories/routine.factory';

test.describe('User with no workouts', async () => {
  let myTrainingPage: MyTrainingPage;

  test.beforeEach(async ({ page }) => {
    myTrainingPage = new MyTrainingPage(page);
    await myTrainingPage.goto();
  });

  test('can switch views on My Training page', async () => {
    //Arrange
    const changedView = 'Calendar';

    //Assert
    await myTrainingPage.expectHeadingToBeVisible();
    await myTrainingPage.expectDefaultViewIsList();
    await myTrainingPage.expectListIsEmpty();

    //Act
    await myTrainingPage.switchViewTo(changedView);

    //Assert
    await myTrainingPage.expectCalendarIsVisible();
    await myTrainingPage.expectCalendarIsEmpty();
  });
});

test.describe('User with existing workouts', async () => {
  let apiContext: APIRequestContext;
  let myTrainingPage: MyTrainingPage;
  let dataTestManager: DataTestManager;

  test.beforeAll(async () => {
    apiContext = await createApiContextFromStorageState('./e2e/.auth/user.json');
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test.beforeEach(async ({ page }) => {
    dataTestManager = new DataTestManager();
    myTrainingPage = new MyTrainingPage(page);
    await myTrainingPage.goto();
  });
  test.afterEach(async () => {
    await dataTestManager.cleanup();
  });

  test('can switch views on My Training page', async () => {
    const workoutHelper = new WorkoutHelper(apiContext);
    const exerciseHelper = new ExerciseHelper(apiContext);
    const changedView = 'Calendar';
    const exerciseName = 'Sit Squats';
    const comment = '';

    const routine = await RoutineFactory.init(apiContext, dataTestManager).create();
    const exercise = await exerciseHelper.getExerciseByName(exerciseName);
    await workoutHelper.createWorkoutAndRegisterCleanup(routine.name, routine.id, exercise, comment, dataTestManager);

    await myTrainingPage.reloadPage();
    await myTrainingPage.expectHeadingToBeVisible();
    await myTrainingPage.expectListContainsWorkouts();

    await myTrainingPage.switchViewTo(changedView);
    await myTrainingPage.expectCalendarIsVisible();
    await myTrainingPage.expectCalendarContainsWorkout();
  });

  test('navigates to workout details page after clicking workout card', async () => {
    const workoutHelper = new WorkoutHelper(apiContext);
    const exerciseHelper = new ExerciseHelper(apiContext);
    const exerciseName = 'Sit Squats';
    const comment = '';

    const routine = await RoutineFactory.init(apiContext, dataTestManager).create();
    const exercise = await exerciseHelper.getExerciseByName(exerciseName);
    const workout = await workoutHelper.createWorkoutAndRegisterCleanup(
      routine.name,
      routine.id,
      exercise,
      comment,
      dataTestManager,
    );
    await myTrainingPage.reloadPage();
    await myTrainingPage.expectHeadingToBeVisible();
    await myTrainingPage.expectListContainsWorkouts();

    const workoutPage = await myTrainingPage.clickWorkoutCard(workout.id);
    await workoutPage.expectToHaveURL();
    await workoutPage.expectHeadingToBeVisible();
    await workoutPage.expectNameToBe(workout.name);
    await workoutPage.expectCommentToBe(workout.comment);
  });
});
