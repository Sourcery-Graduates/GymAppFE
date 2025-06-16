import test, { APIRequestContext } from '@playwright/test';
import { MyTrainingPage } from '../../pages/my-training.page';
import { createApiContextFromStorageState } from '../../helpers/generateApiContext';
import { WorkoutHelper } from '../../helpers/workoutHelper';
import { ExerciseHelper } from '../../helpers/exerciseHelper';

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

  test.beforeAll(async () => {
    apiContext = await createApiContextFromStorageState('./e2e/.auth/user.json');
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test.beforeEach(async ({ page }) => {
    myTrainingPage = new MyTrainingPage(page);
    await myTrainingPage.goto();
  });

  test('can switch views on My Training page', async () => {
    const workoutHelper = new WorkoutHelper(apiContext);
    const exerciseHelper = new ExerciseHelper(apiContext);
    const routineName = 'Strength & Stability';
    const routineDesc =
      'You want to be strong, balanced, and unshakable—the kind of person who could carry all the grocery bags in one trip while standing on one leg.';
    const changedView = 'Calendar';
    const exerciseName = 'Sit Squats';

    const exercise = await exerciseHelper.getExerciseByName(exerciseName);
    const workout = await workoutHelper.createWorkout(routineName, routineDesc, exercise);
    await myTrainingPage.reloadPage();

    await myTrainingPage.expectHeadingToBeVisible();
    await myTrainingPage.expectListContainsWorkouts();

    await myTrainingPage.switchViewTo(changedView);
    await myTrainingPage.expectCalendarIsVisible();
    await myTrainingPage.expectCalendarContainsWorkout();

    await workoutHelper.deleteWorkout(workout.id, workout.routineId);
  });
});
