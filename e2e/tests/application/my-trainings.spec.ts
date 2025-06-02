import test from '@playwright/test';
import { MyTrainingPage } from '../../pages/my-training.page';

test.describe('User with no workouts', async () => {
  let myTrainingPage: MyTrainingPage;

  test.beforeEach(async ({ page }) => {
    myTrainingPage = new MyTrainingPage(page);
    myTrainingPage.goto();
  });

  test('can switch views on My Training page', async () => {
    //Arrange
    const changedView = 'Calendar';

    //Assert
    myTrainingPage.expectHeadingToBeVisible();
    myTrainingPage.expectDefaultViewIsList();
    myTrainingPage.expectListIsEmpty();

    //Act
    myTrainingPage.switchViewTo(changedView);

    //Assert
    myTrainingPage.expectCalendarIsVisible();
    myTrainingPage.expectCalendarIsEmpty();
  });
});
