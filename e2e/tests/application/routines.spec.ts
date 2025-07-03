import test, { APIRequestContext } from '@playwright/test';
import { RoutinesPage } from '../../pages/routines.page';
import { createApiContextFromStorageState } from '../../helpers/generateApiContext';
import { RoutineHelper } from '../../helpers/routineHelper';
import { RoutineDetailsPage } from '../../pages/routine-details.page';
import { routineData } from '../../test-data/routine.data';
import { RoutineUpdatePage } from '../../pages/routine-update.page';
import { DataTestManager } from '../../test-utils/dataTestManager';

test.describe('User without existing routines', async () => {
  let routinesPage: RoutinesPage;
  let routineHelper: RoutineHelper;
  let apiContext: APIRequestContext;
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
    dataTestManager = new DataTestManager();
    await routinesPage.goto();
    await routinesPage.expectHeadingToBeVisible();
  });

  test.afterEach(async () => {
    await dataTestManager.cleanup();
  });

  test('can add a new routine without any exercises', async () => {
    const routineId = await routinesPage.addNewRoutineWithNoExercise();
    // Register cleanup for routine to be removed in afterEach
    await routineHelper.registerRoutineCleanup(routineId, dataTestManager);

    await routinesPage.expectRoutineToBeVisible(routineData.emptyRoutineName);
  });

  test('can add a new routine with one exercise', async () => {
    const routineId = await routinesPage.addNewRoutine();
    // Register cleanup for routine to be removed in afterEach
    await routineHelper.registerRoutineCleanup(routineId, dataTestManager);

    await routinesPage.expectRoutineToBeVisible(routineData.routineName);
  });
});

test.describe('User with existing routines', async () => {
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

  test('can edit routine with routine options button', async () => {
    await routineHelper.createRoutineAndRegisterCleanup(
      routineData.routineName,
      routineData.description,
      dataTestManager,
    );

    await routinesPage.reloadPage();
    await routinesPage.editRoutineWithRoutineOptions();
    await routineUpdatePage.updateRoutine();
    await routinesPage.expectRoutineNameToBeUpdated();
  });

  test('can edit routine directly from routine page', async () => {
    await routineHelper.createRoutineAndRegisterCleanup(
      routineData.routineName,
      routineData.description,
      dataTestManager,
    );

    await routinesPage.reloadPage();
    await routinesPage.goToRoutineDetails();
    await routinesPage.goToEditRoutineForm();
    await routineUpdatePage.updateRoutine();
    await routinesPage.expectRoutineNameToBeUpdated();
  });

  test('can delete routine with routine options button', async () => {
    await routineHelper.createRoutine(routineData.routineName, routineData.description);

    await routinesPage.reloadPage();
    await routinesPage.deleteRoutineWithRoutineOptions();
    await routinesPage.expectListRoutineToBeEmpty();
  });

  test('can delete routine directly from routine page', async () => {
    await routineHelper.createRoutine(routineData.routineName, routineData.description);

    await routinesPage.reloadPage();
    await routinesPage.goToRoutineDetails();
    await routineDetailsPage.deleteRoutine();
    await routinesPage.expectListRoutineToBeEmpty();
  });
});
