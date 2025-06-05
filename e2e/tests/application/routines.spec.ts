import test from '@playwright/test';
import { RoutinesPage } from '../../pages/routines.page';

test.describe('Routines page', async () => {
  let routinesPage: RoutinesPage;

  test.beforeEach(async ({ page }) => {
    routinesPage = new RoutinesPage(page);
    await routinesPage.goto();
    await routinesPage.expectHeadingToBeVisible();
  });

  test('Add a new routine without any exercises', async () => {
    await routinesPage.addNewRoutineWithNoExercise();
  });

  test('Add a new routine with one exercise', async () => {
    await routinesPage.addNewRoutine();
  });
});
