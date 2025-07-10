import test, { APIRequestContext } from '@playwright/test';
import { RoutinesPage } from '../../pages/routines.page';
import { createApiContextFromStorageState } from '../../helpers/generateApiContext';
import { DataTestManager } from '../../test-utils/dataTestManager';
import { RoutineFactory } from '../../factories/routine.factory';

test.describe('User without existing routines', async () => {
  let routinesPage: RoutinesPage;
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
    routinesPage = new RoutinesPage(page);
    await routinesPage.goto();
    await routinesPage.expectHeadingToBeVisible();
  });

  test.afterEach(async () => {
    await dataTestManager.cleanup();
  });

  test('can add a new routine without any exercises', async () => {
    const routineData = RoutineFactory.init(apiContext, dataTestManager);
    const routineId = await routineData.createViaUI(routinesPage, false);
    await routinesPage.expectRoutineToBeVisible(routineId);
  });

  test('can add a new routine with one exercise', async () => {
    const routineData = RoutineFactory.init(apiContext, dataTestManager);
    const routineId = await routineData.createViaUI(routinesPage);
    await routinesPage.expectRoutineToBeVisible(routineId);
  });
});

test.describe('User with existing routines', async () => {
  let routinesPage: RoutinesPage;
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
    routinesPage = new RoutinesPage(page);
    await routinesPage.goto();
    await routinesPage.expectHeadingToBeVisible();
  });

  test.afterEach(async () => {
    await dataTestManager.cleanup();
  });

  test('can edit routine with routine options button', async () => {
    const updatedData = await RoutineFactory.generateRandomNameAndDescription();

    const routine = await RoutineFactory.init(apiContext, dataTestManager).create();
    await routinesPage.reloadPage();

    const routineUpdatePage = await routinesPage.editRoutineWithRoutineOptions(routine.id);
    await routineUpdatePage.updateRoutine(updatedData.name);
    await routinesPage.expectRoutineNameToBeUpdated(routine.id, updatedData.name);
  });

  test('can edit routine directly from routine page', async () => {
    const updatedData = await RoutineFactory.generateRandomNameAndDescription();

    const routine = await RoutineFactory.init(apiContext, dataTestManager).create();
    await routinesPage.reloadPage();

    const routineDetailsPage = await routinesPage.goToRoutineDetailsPage(routine.id);
    const routineUpdatePage = await routineDetailsPage.editRoutine(routine.id);
    await routineUpdatePage.updateRoutine(updatedData.name);
    await routinesPage.expectRoutineNameToBeUpdated(routine.id, updatedData.name);
  });

  test('can delete routine with routine options button', async () => {
    const routine = await RoutineFactory.init(apiContext, dataTestManager).withoutCleanup().create();

    await routinesPage.reloadPage();
    await routinesPage.deleteRoutineWithRoutineOptions(routine.id);
    await routinesPage.expectListRoutineToBeEmpty();
  });

  test('can delete routine directly from routine page', async () => {
    const routine = await RoutineFactory.init(apiContext, dataTestManager).withoutCleanup().create();

    await routinesPage.reloadPage();
    const routineDetailsPage = await routinesPage.goToRoutineDetailsPage(routine.id);
    await routineDetailsPage.deleteRoutine();
    await routinesPage.expectListRoutineToBeEmpty();
  });
});
