import test, { expect } from '@playwright/test';
import { MyTrainingPage } from '../../pages/my-training.page';

test.describe('User with no workouts', async () => {
  test.beforeEach(async ({ page }) => {
    page.goto('/my-training');
  });

  test('can swith views on My Training page', async ({ page }) => {
    //Arrange
    const myTrainingPage = new MyTrainingPage(page);
    const title = 'MY TRAININGS';
    const defaultView = 'List';
    const changedView = 'Calendar';

    //Assert
    await expect(myTrainingPage.title).toHaveText(title);
    await expect(myTrainingPage.selectView).toHaveValue(defaultView);
    await expect(myTrainingPage.workoutList).toBeEmpty();

    //Act
    await myTrainingPage.selectView.selectOption('Calendar');

    //Assert
    await expect(myTrainingPage.selectView).toHaveValue(changedView);
    await expect(myTrainingPage.currentMonthButton).toBeVisible();
    await expect(myTrainingPage.calendar).toBeVisible();

    const workouts = await myTrainingPage.workoutInCalendar.all();
    for (const workout of workouts) {
      await expect(workout).toBeEmpty();
    }
  });
});
