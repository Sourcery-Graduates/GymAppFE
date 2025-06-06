import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { HomePage } from '../../pages/home.page';

test.describe('User login to GymApp', async () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('unsuccessful login with non-existing user', async () => {
    // Arrange
    const nonExistingEmail = 'user@test.com';
    const nonExistingPassword = 'password';

    // Act
    await loginPage.login(nonExistingEmail, nonExistingPassword);

    // Assert
    await loginPage.expectErrorMessage();
  });

  test('successful login', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    const userEmail = process.env.USER_EMAIL!;
    const userPassword = process.env.USER_PASSWORD!;

    // Act
    await loginPage.login(userEmail, userPassword);

    // Assert
    await homePage.expectWelcomeMessage();
  });
});
