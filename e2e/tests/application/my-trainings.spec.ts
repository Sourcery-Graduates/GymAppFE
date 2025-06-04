import test, { expect, request } from '@playwright/test';
import { MyTrainingPage } from '../../pages/my-training.page';
import { createApiContextFromStorageState } from '../../helpers/generateApiContext';

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
  //   test.beforeEach(async ({ page, request }) => {
  //     //data upload routine, workout
  //     const routineResponse = await request.post('api/workout/routine', {
  //       data: {
  //         name: 'Strength & Stability',
  //         description:
  //           'You want to be strong, balanced, and unshakable—the kind of person who could carry all the grocery bags in one trip while standing on one leg. This routine focuses on controlled lifts, core stabilization, and unilateral exercises to build bulletproof strength.',
  //       },
  //     });

  //     const routine = await routineResponse.json();

  //     const routineExercisesResponse = await request.post(`api/workout/routine/exercise?routineId=${routine.id}`, {
  //       data: [
  //         {
  //           exerciseId: '383ec35d-a9f5-4c0d-84f7-c7f9344d0092',
  //           defaultSets: 3,
  //           defaultReps: 12,
  //           defaultWeight: 40,
  //           defaultRestTime: 90,
  //           notes: '',
  //           restTimeUnit: 'seconds',
  //           weightUnit: 'kg',
  //           routineExerciseId: '383ec35d-a9f5-4c0d-84f7-c7f9344d0092',
  //           exercise: {
  //             id: '383ec35d-a9f5-4c0d-84f7-c7f9344d0092',
  //             name: 'Sit Squats',
  //           },
  //           orderNumber: 1,
  //         },
  //         {
  //           exerciseId: '718539a9-5054-43a3-9176-990fdf7a193b',
  //           defaultSets: 3,
  //           defaultReps: 12,
  //           defaultWeight: 40,
  //           defaultRestTime: 90,
  //           notes: '',
  //           restTimeUnit: 'seconds',
  //           weightUnit: 'kg',
  //           routineExerciseId: '718539a9-5054-43a3-9176-990fdf7a193b',
  //           exercise: {
  //             id: '718539a9-5054-43a3-9176-990fdf7a193b',
  //             name: 'Single-Cone Sprint Drill',
  //           },
  //           orderNumber: 2,
  //         },
  //       ],
  //     });

  //     const routineExercises = await routineExercisesResponse.json();

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

  //     myTrainingPage = new MyTrainingPage(page);
  //     await myTrainingPage.goto();
  //   });

  test('can switch views on My Training page', async ({ page }) => {
    //Arrange
    const apiContext = await createApiContextFromStorageState('./e2e/.auth/user.json');

    myTrainingPage = new MyTrainingPage(page);
    await myTrainingPage.goto();
    const changedView = 'Calendar';
    await myTrainingPage.expectHeadingToBeVisible();

    // const cookies = await page.context().cookies();
    // const jsessionCookie = cookies.find((cookie) => cookie.name === 'JSESSIONID');

    const routineResponse = await apiContext.post('/api/workout/routine', {
      //   headers: { Cookie: `JSESSIONID=${jsessionCookie?.value}`, 'Content-Type': 'application/json' },
      data: {
        name: 'Strength & Stability',
        description:
          'You want to be strong, balanced, and unshakable—the kind of person who could carry all the grocery bags in one trip while standing on one leg. This routine focuses on controlled lifts, core stabilization, and unilateral exercises to build bulletproof strength.',
      },
    });

    console.log('Status', routineResponse.status());
    console.log(await routineResponse.text());

    await apiContext.dispose();
    // const routine = await routineResponse.json();

    //Assert
    // expect(routineResponse.status()).toBe(201);
    // await myTrainingPage.expectListContainsWorkouts();
  });
});
