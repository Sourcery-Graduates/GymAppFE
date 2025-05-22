import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });

test.describe("User login to GymApp", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  })

  test('unsuccessful login with non-existing user', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const nonExistingEmail = 'user@test.com';
    const nonExistingPassword = 'password'; 
    const expectedErrorMessage = 'Invalid email or password. Please try again.'

    // Act
    await loginPage.emailInput.fill(nonExistingEmail);
    await loginPage.passwordInput.fill(nonExistingPassword);
    await loginPage.loginButton.click();

    // Assert
    await expect(loginPage.credentialsError).toHaveText(expectedErrorMessage);
  });

    test('successful login', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const userEmail = process.env.USER_EMAIL!;
    const userPassword = process.env.USER_PASSWORD!; 
    const expectedWelcomeMessage = 'Welcome to Gym App!'

    // Act
    await loginPage.emailInput.fill(userEmail);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    // Assert
    await expect(homePage.welcomeMessage).toHaveText(expectedWelcomeMessage);
  });
});
