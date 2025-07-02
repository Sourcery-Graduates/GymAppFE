import test, { APIRequestContext } from '@playwright/test';
import { RoutinesPage } from '../../pages/routines.page';
import { createApiContextFromStorageState } from '../../helpers/generateApiContext';
import { RoutineHelper } from '../../helpers/routineHelper';
import { RoutineDetailsPage } from '../../pages/routine-details.page';
import { routineData } from '../../test-data/routine.data';
import { RoutineUpdatePage } from '../../pages/routine-update.page';
import { DataTestManager } from '../../helpers/dataTestManager';

test.describe('Routines page', async () => {
  let routinesPage: RoutinesPage;
  let routineHelper: RoutineHelper;
  let apiContext: APIRequestContext;
  let routineDetailsPage: RoutineDetailsPage;
  let routineUpdatePage: RoutineUpdatePage;
  let dataTestManager: DataTestManager;

  test.beforeAll(async () => {
    apiContext = await createApiContextFromStorageState('./e2e/.auth/user.json');
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test.beforeEach(async ({ page }) => {
    routinesPage = new RoutinesPage(page);
    routineHelper = new RoutineHelper(apiContext);
    routineDetailsPage = new RoutineDetailsPage(page);
    routineUpdatePage = new RoutineUpdatePage(page);
    dataTestManager = new DataTestManager();
    await routinesPage.goto();
    await routinesPage.expectHeadingToBeVisible();
  });

  test.afterEach(async () => {
    await dataTestManager.cleanup();
  });

  test('Add a new routine without any exercises', async () => {
    const routineId = await routinesPage.addNewRoutineWithNoExercise();
    await routineHelper.registerRoutineCleanup(routineId, dataTestManager);

    await routinesPage.expectRoutineToBeVisible(routineData.emptyRoutineName);
  });

  test('Add a new routine with one exercise', async () => {
    const routineId = await routinesPage.addNewRoutine();
    await routineHelper.registerRoutineCleanup(routineId, dataTestManager);

    await routinesPage.expectRoutineToBeVisible(routineData.routineName);
  });

  test('Edit routine with routine options button', async () => {
    const registerCleanup = true;
    await routineHelper.createRoutine(
      routineData.routineName,
      routineData.description,
      dataTestManager,
      registerCleanup,
    );

    await routinesPage.reloadPage();
    await routinesPage.editRoutineWithRoutineOptions();
    await routineUpdatePage.updateRoutine();
    await routinesPage.expectRoutineNameToBeUpdated();
  });

  test('Edit routine directly from routine page', async () => {
    const registerCleanup = true;
    await routineHelper.createRoutine(
      routineData.routineName,
      routineData.description,
      dataTestManager,
      registerCleanup,
    );

    await routinesPage.reloadPage();
    await routinesPage.goToRoutineDetails();
    await routinesPage.goToEditRoutineForm();
    await routineUpdatePage.updateRoutine();
    await routinesPage.expectRoutineNameToBeUpdated();
  });

  test('Delete routine with routine options button', async () => {
    const registerCleanup = false;
    await routineHelper.createRoutine(
      routineData.routineName,
      routineData.description,
      dataTestManager,
      registerCleanup,
    );

    await routinesPage.reloadPage();
    await routinesPage.deleteRoutineWithRoutineOptions();
    await routinesPage.expectListRoutineToBeEmpty();
  });

  test('Delete routine directly from routine page', async () => {
    const registerCleanup = false;
    await routineHelper.createRoutine(
      routineData.routineName,
      routineData.description,
      dataTestManager,
      registerCleanup,
    );

    await routinesPage.reloadPage();
    await routinesPage.goToRoutineDetails();
    await routineDetailsPage.deleteRoutine();
    await routinesPage.expectListRoutineToBeEmpty();
  });
});
