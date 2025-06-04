import test, { expect, request } from '@playwright/test';
import { MyTrainingPage } from '../../pages/my-training.page';
import { createApiContextFromStorageState } from '../../helpers/generateApiContext';
import { RoutineHelper } from '../../helpers/routineHelper';
import { RoutineExerciseHelper } from '../../helpers/routineExerciseHelper';
import { twoExercises } from '../../test-data/exercises.data';

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
    await myTrainingPage.expectHeadingToBeVisible();

    //     const workoutResponse = await request.post('api/workout/workout', {
    //       data: {
    //         name: 'Strength & Stability',
    //         routineId: routine.id,
    //         date: '2025-06-03T00:00:00.000Z',
    //         comment: '',
    //         exercises: [
    //           {
    //             exerciseId: '383ec35d-a9f5-4c0d-84f7-c7f9344d0092',
    //             exerciseName: 'Sit Squats',
    //             orderNumber: 1,
    //             notes: '',
    //             sets: [
    //               {
    //                 setNumber: 1,
    //                 reps: 12,
    //                 weight: 40,
    //                 restTime: 90,
    //                 comment: '',
    //               },
    //               {
    //                 setNumber: 2,
    //                 reps: 12,
    //                 weight: 40,
    //                 restTime: 90,
    //                 comment: '',
    //               },
    //               {
    //                 setNumber: 3,
    //                 reps: 12,
    //                 weight: 40,
    //                 restTime: 90,
    //                 comment: '',
    //               },
    //             ],
    //           },
    //           {
    //             exerciseId: '718539a9-5054-43a3-9176-990fdf7a193b',
    //             exerciseName: 'Single-Cone Sprint Drill',
    //             orderNumber: 2,
    //             notes: '',
    //             sets: [
    //               {
    //                 setNumber: 1,
    //                 reps: 12,
    //                 weight: 40,
    //                 restTime: 90,
    //                 comment: '',
    //               },
    //               {
    //                 setNumber: 2,
    //                 reps: 12,
    //                 weight: 40,
    //                 restTime: 90,
    //                 comment: '',
    //               },
    //               {
    //                 setNumber: 3,
    //                 reps: 12,
    //                 weight: 40,
    //                 restTime: 90,
    //                 comment: '',
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     });
    //     const workout = await workoutResponse.json();
  });

  test('can switch views on My Training page', async ({ page }) => {
    //Arrange
    const apiContext = await createApiContextFromStorageState('./e2e/.auth/user.json');
    const routineHelper = new RoutineHelper(apiContext);
    const routineName = 'Strength & Stability';
    const routineDesc =
      'You want to be strong, balanced, and unshakable—the kind of person who could carry all the grocery bags in one trip while standing on one leg.';
    const routineExercises = new RoutineExerciseHelper(apiContext);
    const exercises = twoExercises;
    const changedView = 'Calendar';

    const routine = await routineHelper.createRoutine(routineName, routineDesc);
    expect(routine.id).toBeDefined();
    
    await routineExercises.addExercisesToRoutine(routine.id, exercises);

    


    //Assert
    // await myTrainingPage.expectListContainsWorkouts();
    await apiContext.dispose();
  });
});
