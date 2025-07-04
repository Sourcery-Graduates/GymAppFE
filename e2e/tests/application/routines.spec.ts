import test, { APIRequestContext } from '@playwright/test';
import { RoutinesPage } from '../../pages/routines.page';
import { createApiContextFromStorageState } from '../../helpers/generateApiContext';
import { RoutineHelper } from '../../helpers/routineHelper';
import { routineData } from '../../test-data/routine.data';

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
    await routinesPage.expectRoutineToBeVisible(routineId);
    await routineHelper.deleteRoutine(routineId);
  });

  test('Add a new routine with one exercise', async () => {
    const routineId = await routinesPage.addNewRoutine();
    await routinesPage.expectRoutineToBeVisible(routineId);
    await routineHelper.deleteRoutine(routineId);
  });

  test('Edit routine with routine options button from routines page', async () => {
    const routine = await routineHelper.createRoutine(routineData.routineName);
    await routinesPage.reloadPage();

    const routineUpdatePage = await routinesPage.editRoutineWithRoutineOptions(routine.id);
    await routineUpdatePage.updateRoutine();
    await routinesPage.expectRoutineNameToBeUpdated(routine.id);

    await routineHelper.deleteRoutine(routine.id);
  });

  test('Edit routine directly from routine details page', async () => {
    const routine = await routineHelper.createRoutine(routineData.routineName);
    await routinesPage.reloadPage();

    const routineDetailsPage = await routinesPage.goToRoutineDetailsPage(routine.id);
    const routineUpdatePage = await routineDetailsPage.editRoutine(routine.id);
    await routineUpdatePage.updateRoutine();
    await routinesPage.expectRoutineNameToBeUpdated(routine.id);

    await routineHelper.deleteRoutine(routine.id);
  });

  test('Delete routine with routine options button from routines page', async () => {
    const routine = await routineHelper.createRoutine(routineData.routineName);
    await routinesPage.reloadPage();
    await routinesPage.deleteRoutineWithRoutineOptions(routine.id);
    await routinesPage.expectListRoutineToBeEmpty();
  });

  test('Delete routine directly from routine details page', async () => {
    const routine = await routineHelper.createRoutine(routineData.routineName);
    await routinesPage.reloadPage();
    const routineDetailsPage = await routinesPage.goToRoutineDetailsPage(routine.id);
    await routineDetailsPage.deleteRoutine();
    await routinesPage.expectListRoutineToBeEmpty();
  });
});
