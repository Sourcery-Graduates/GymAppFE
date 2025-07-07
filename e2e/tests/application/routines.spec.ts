import test, { APIRequestContext } from '@playwright/test';
import { RoutinesPage } from '../../pages/routines.page';
import { createApiContextFromStorageState } from '../../helpers/generateApiContext';
import { RoutineHelper } from '../../helpers/routineHelper';
import { routineData } from '../../test-data/routine.data';
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
    routineHelper = new RoutineHelper(apiContext);
    dataTestManager = new DataTestManager();
    routinesPage = new RoutinesPage(page);
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

    await routinesPage.expectRoutineToBeVisible(routineId);
  });

  test('can add a new routine with one exercise', async () => {
    const routineId = await routinesPage.addNewRoutine();
    // Register cleanup for routine to be removed in afterEach
    await routineHelper.registerRoutineCleanup(routineId, dataTestManager);

    await routinesPage.expectRoutineToBeVisible(routineId);
  });
});

test.describe('User with existing routines', async () => {
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
    dataTestManager = new DataTestManager();
    routineHelper = new RoutineHelper(apiContext);
    routinesPage = new RoutinesPage(page);
    await routinesPage.goto();
    await routinesPage.expectHeadingToBeVisible();
  });

  test.afterEach(async () => {
    await dataTestManager.cleanup();
  });

  test('can edit routine with routine options button', async () => {
    const routine = await routineHelper.createRoutineAndRegisterCleanup(
      routineData.routineName,
      routineData.description,
      dataTestManager,
    );

    await routinesPage.reloadPage();
    const routineUpdatePage = await routinesPage.editRoutineWithRoutineOptions(routine.id);
    await routineUpdatePage.updateRoutine();
    await routinesPage.expectRoutineNameToBeUpdated(routine.id);
  });

  test('can edit routine directly from routine page', async () => {
    const routine = await routineHelper.createRoutineAndRegisterCleanup(
      routineData.routineName,
      routineData.description,
      dataTestManager,
    );

    await routinesPage.reloadPage();
    const routineDetailsPage = await routinesPage.goToRoutineDetailsPage(routine.id);
    const routineUpdatePage = await routineDetailsPage.editRoutine(routine.id);
    await routineUpdatePage.updateRoutine();
    await routinesPage.expectRoutineNameToBeUpdated(routine.id);
  });

  test('can delete routine with routine options button', async () => {
    const routine = await routineHelper.createRoutine(routineData.routineName, routineData.description);

    await routinesPage.reloadPage();
    await routinesPage.deleteRoutineWithRoutineOptions(routine.id);
    await routinesPage.expectListRoutineToBeEmpty();
  });

  test('can delete routine directly from routine page', async () => {
    const routine = await routineHelper.createRoutine(routineData.routineName, routineData.description);

    await routinesPage.reloadPage();
    const routineDetailsPage = await routinesPage.goToRoutineDetailsPage(routine.id);
    await routineDetailsPage.deleteRoutine();
    await routinesPage.expectListRoutineToBeEmpty();
  });
});
