import test, { APIRequestContext } from '@playwright/test';
import { RoutinesPage } from '../../pages/routines.page';
import { createApiContextFromStorageState } from '../../helpers/generateApiContext';
import { RoutineHelper } from '../../helpers/routineHelper';
import { routineData } from '../../test-data/routine.data';
import { RoutineCardComponent } from '../../components/routineCard.component';

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
    await routinesPage.expectRoutineToBeVisible(routineData.emptyRoutineName);
    await routineHelper.deleteRoutine(routineId);
  });

  test('Add a new routine with one exercise', async () => {
    const routineId = await routinesPage.addNewRoutine();
    await routinesPage.expectRoutineToBeVisible(routineData.routineName);
    await routineHelper.deleteRoutine(routineId);
  });

  test.only('Edit routine with routine options button', async ({ page }) => {
    const routine = await routineHelper.createRoutine(routineData.routineName);
    await routinesPage.reloadPage();
    
    const routineCard = await RoutineCardComponent.getByName(page, routine.name);
    console.log(`Object ${routineCard} name: ${routineCard.name}`);
    const routineUpdatePage = await routinesPage.editRoutineWithRoutineOptions(routine);
    await routineUpdatePage.updateRoutine();
    console.log(`Object ${routineCard} name: ${routineCard.name}`);
    await routinesPage.expectRoutineNameToBeUpdated(routineCard);

    await routineHelper.deleteRoutine(routine.id);
  });

  test('Edit routine directly from routine details page', async ({ page }) => {
    const routine = await routineHelper.createRoutine(routineData.routineName);
    await routinesPage.reloadPage();
    const routineCard = await RoutineCardComponent.getByName(page, routine.name);

    const routineDetailsPage = await routinesPage.goToRoutineDetailsPage(routine);
    const routineUpdatePage = await routineDetailsPage.editRoutine(routine);
    await routineUpdatePage.updateRoutine();
    await routinesPage.expectRoutineNameToBeUpdated(routineCard);

    await routineHelper.deleteRoutine(routine.id);
  });

  // test('Delete routine with routine options button', async () => {
  //   await routineHelper.createRoutine(routineData.routineName);
  //   await routinesPage.reloadPage();
  //   await routinesPage.deleteRoutineWithRoutineOptions();
  //   await routinesPage.expectListRoutineToBeEmpty();
  // });

  // test('Delete routine directly from routine page', async () => {
  //   const routine = await routineHelper.createRoutine(routineData.routineName);
  //   await routinesPage.reloadPage();
  //   const routineDetailsPage = await routinesPage.goToRoutineDetailsPage(routine);
  //   await routineDetailsPage.deleteRoutine();
  //   await routinesPage.expectListRoutineToBeEmpty();
  // });
});
