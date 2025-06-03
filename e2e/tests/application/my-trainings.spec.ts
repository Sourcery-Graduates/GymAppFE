import test from '@playwright/test';
import { MyTrainingPage } from '../../pages/my-training.page';

test.describe('User with no workouts', async () => {
  let myTrainingPage: MyTrainingPage;

  test.beforeEach(async ({ page }) => {
    myTrainingPage = new MyTrainingPage(page);
    await myTrainingPage.goto();
  });

  test('can switch views on My Training page', async () => {
    //Arrange
    const changedView = 'Calendar';

    //Assert
    await myTrainingPage.expectHeadingToBeVisible();
    await myTrainingPage.expectDefaultViewIsList();
    await myTrainingPage.expectListIsEmpty();

    //Act
    await myTrainingPage.switchViewTo(changedView);

    //Assert
    await myTrainingPage.expectCalendarIsVisible();
    await myTrainingPage.expectCalendarIsEmpty();
  });
});
