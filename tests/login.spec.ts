import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

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
})
