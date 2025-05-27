import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('homepage is presented to the logged in user', async ({ page }) => {
  //Arrange
  const homePage = new HomePage(page);
  const expectedWelcomeMessage = 'Welcome to Gym App!';

  //Act
  await page.goto('/');

  //Assert
  await expect(homePage.welcomeMessage).toHaveText(expectedWelcomeMessage);
});
