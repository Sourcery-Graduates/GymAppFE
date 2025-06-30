import test, { APIRequestContext } from '@playwright/test';
import { RoutinesPage } from '../../pages/routines.page';
import { createApiContextFromStorageState } from '../../helpers/generateApiContext';
import { RoutineHelper } from '../../helpers/routineHelper';
import { RoutineDetailsPage } from '../../pages/routine-details.page';
import { routineData } from '../../test-data/routine.data';
import { RoutineUpdatePage } from '../../pages/routine-update.page';

test.describe('Routines page', async () => {
  let routinesPage: RoutinesPage;
  let routineHelper: RoutineHelper;
  let apiContext: APIRequestContext;
  let routineDetailsPage: RoutineDetailsPage;
  let routineUpdatePage: RoutineUpdatePage;

  test.beforeAll(async () => {
    apiContext = await createApiContextFromStorageState('./e2e/.auth/user.json');
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test.beforeEach(async ({ page }) => {
    routinesPage = new RoutinesPage(page);
    routineHelper = new RoutineHelper(apiContext);
    routineUpdatePage = new RoutineUpdatePage(page);
    await routinesPage.goto();
    await routinesPage.expectHeadingToBeVisible();
  });

  test('Add a new routine without any exercises', async () => {
    const routineId = await routinesPage.addNewRoutineWithNoExercise();
    await routinesPage.expectRoutineToBeVisible(routineData.emptyRoutineName);
    await routineHelper.deleteRoutine(routineId);
  });

  test('Add a new routine with one exercise', async () => {
    const routineId = await routinesPage.addNewRoutine();
    await routinesPage.expectRoutineToBeVisible(routineData.routineName);
    await routineHelper.deleteRoutine(routineId);
  });

  test('Edit routine with routine options button', async () => {
    const routine = await routineHelper.createRoutine(routineData.routineName);
    await routinesPage.reloadPage();
    await routinesPage.editRoutineWithRoutineOptions();
    await routineUpdatePage.updateRoutine();
    await routinesPage.expectRoutineNameToBeUpdated();
    await routineHelper.deleteRoutine(routine.id);
  });

  test('Edit routine directly from routine page', async () => {
    const routine = await routineHelper.createRoutine(routineData.routineName);
    await routinesPage.reloadPage();
    await routinesPage.goToRoutineDetails();
    await routinesPage.goToEditRoutineForm();
    await routineUpdatePage.updateRoutine();
    await routinesPage.expectRoutineNameToBeUpdated();
    await routineHelper.deleteRoutine(routine.id);
  });

  test('Delete routine with routine options button', async () => {
    await routineHelper.createRoutine(routineData.routineName);
    await routinesPage.reloadPage();
    await routinesPage.deleteRoutineWithRoutineOptions();
    await routinesPage.expectListRoutineToBeEmpty();
  });

  test('Delete routine directly from routine page', async ({ page }) => {
    const routine = await routineHelper.createRoutine(routineData.routineName);
    await routinesPage.reloadPage();
    await routinesPage.goToRoutineDetails();
    routineDetailsPage = new RoutineDetailsPage(page, routine.id);
    await routineDetailsPage.deleteRoutine();
    await routinesPage.expectListRoutineToBeEmpty();
  });
});
