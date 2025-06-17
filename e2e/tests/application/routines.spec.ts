import test, { APIRequestContext } from '@playwright/test';
import { RoutinesPage } from '../../pages/routines.page';
import { createApiContextFromStorageState } from '../../helpers/generateApiContext';
import { RoutineHelper } from '../../helpers/routineHelper';

test.describe('Routines page', async () => {
  let routinesPage: RoutinesPage;
  let routineHelper: RoutineHelper;
  let apiContext: APIRequestContext;

  test.beforeAll(async () => {
    apiContext = await createApiContextFromStorageState('./e2e/.auth/user.json');
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test.beforeEach(async ({ page }) => {
    routinesPage = new RoutinesPage(page);
    routineHelper = new RoutineHelper(apiContext);
    await routinesPage.goto();
    await routinesPage.expectHeadingToBeVisible();
  });

  test('Add a new routine without any exercises', async () => {
    const routineId = await routinesPage.addNewRoutineWithNoExercise();
    await routineHelper.deleteRoutine(routineId);
  });

  test('Add a new routine with one exercise', async () => {
    const routineId = await routinesPage.addNewRoutine();
    await routineHelper.deleteRoutine(routineId);
  });

  test("Edit routine", async () => {
    const routineName = 'Strength & Stability';
    const routineDesc =
      'You want to be strong, balanced, and unshakable—the kind of person who could carry all the grocery bags in one trip while standing on one leg.';
    const routine = await routineHelper.createRoutine(routineName, routineDesc);
    await routineHelper.deleteRoutine(routine.id);
  });

  test.only("Delete routine", async () => {
    const routineName = 'Test Routine';
    const routine = await routineHelper.createRoutine(routineName);
    await routinesPage.reloadPage();
    await routinesPage.deleteRoutine();
  })
});
