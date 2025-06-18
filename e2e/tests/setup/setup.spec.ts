import { test } from '@playwright/test';
import { loginProgrammatically } from '../../helpers/loginHelper';
import { HomePage } from '../../pages/home.page';
import { LoginPage } from '../../pages/login.page';

test('setup: authenticate user', async ({ page }) => {
  // Arrange
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userEmail = process.env.USER_EMAIL!;
  const userPassword = process.env.USER_PASSWORD!;

  // Act
  await loginPage.goto();
  await loginPage.expectHeadingToBeVisible();

  await loginProgrammatically(page, userEmail, userPassword);

  await homePage.goto();
  await homePage.expectWelcomeMessage();

  await page.context().storageState({ path: './e2e/.auth/user.json' });
});
