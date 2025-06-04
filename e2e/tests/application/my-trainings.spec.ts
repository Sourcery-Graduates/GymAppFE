import test, { expect } from '@playwright/test';
import { MyTrainingPage } from '../../pages/my-training.page';
import { createApiContextFromStorageState } from '../../helpers/generateApiContext';
import { RoutineHelper } from '../../helpers/routineHelper';
import { RoutineExerciseHelper } from '../../helpers/routineExerciseHelper';
import { twoExercises } from '../../test-data/exercises.data';
import { WorkoutHelper } from '../../helpers/workoutHelper';

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

test.describe.only('User with existing workouts', async () => {
  let myTrainingPage: MyTrainingPage;

  test.beforeEach(async ({ page }) => {
    myTrainingPage = new MyTrainingPage(page);
    await myTrainingPage.goto();
  });

  test('can switch views on My Training page', async () => {
    //Arrange
    const apiContext = await createApiContextFromStorageState('./e2e/.auth/user.json');
    const routineHelper = new RoutineHelper(apiContext);
    const routineName = 'Strength & Stability';
    const routineDesc =
      'You want to be strong, balanced, and unshakable—the kind of person who could carry all the grocery bags in one trip while standing on one leg.';
    const routineExercises = new RoutineExerciseHelper(apiContext);
    const workoutHelper = new WorkoutHelper(apiContext);
    const exercises = twoExercises;
    const workoutName = 'Strength & Stability workout';
    const changedView = 'Calendar';

    //Act
    const routine = await routineHelper.createRoutine(routineName, routineDesc);
    expect(routine.id).toBeDefined();

    await routineExercises.addExercisesToRoutine(routine.id, exercises);
    await workoutHelper.createWorkout(workoutName, routine.id, exercises);

    await myTrainingPage.reloadPage();

    //Assert
    await myTrainingPage.expectHeadingToBeVisible();
    await myTrainingPage.expectListContainsWorkouts();
    await myTrainingPage.switchViewTo(changedView);
    await myTrainingPage.expectCalendarIsVisible();
    await myTrainingPage.expectCalendarContainsWorkout();
    await apiContext.dispose();
  });
});
