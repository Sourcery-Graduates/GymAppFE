import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { HomePage } from '../../pages/home.page';

test('setup: authenticate user', async ({ page }) => {
  //Arrange
  const userEmail = process.env.USER_EMAIL!;
  const userPassword = process.env.USER_PASSWORD!;
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const expectedWelcomeMessage = 'Welcome to Gym App!';

  //Act
  await page.goto('/login');
  await loginPage.login(userEmail, userPassword);

  //Assert
  await page.waitForURL('/');
  await expect(homePage.welcomeMessage).toHaveText(expectedWelcomeMessage);

  //Act
  await page.context().storageState({ path: './e2e/.auth/user.json' });
});
