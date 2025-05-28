import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { RegisterPage } from '../pages/register.page';

dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });

test.describe('Registration tests', async () => {
  let loginPage: LoginPage;
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.registerLink.click();
  });

  test('register link redirects to registration form', async ({ page }) => {
    // Arrange
    registerPage = new RegisterPage(page);
    const expectedText = 'Sign Up';

    // Assert
    await expect(registerPage.signUpText).toHaveText(expectedText);
  });

  test('registration fails when email field is empty', async ({ page }) => {
    // Arrange
    registerPage = new RegisterPage(page);
    const expectedEmailErrorMessage = 'Email is required';
    const testPassword = 'password';

    // Act
    await registerPage.passwordInput.fill(testPassword);
    await registerPage.confirmPasswordInput.fill(testPassword);
    await registerPage.nextButton.click();

    // Assert
    await expect(registerPage.emailError).toHaveText(expectedEmailErrorMessage);
  });

  test('registration fails when password field is empty', async ({ page }) => {
    // Arrange
    registerPage = new RegisterPage(page);
    const testEmail = 'user@test.com';
    const testPassoword = 'password';
    const expectedPasswordErrorMessage = 'Password is required';
    const expectedMatchPasswordError = 'Passwords do not match';

    // Act
    await registerPage.emailInput.fill(testEmail);
    await registerPage.confirmPasswordInput.fill(testPassoword);
    await registerPage.nextButton.click();

    // Assert
    await expect(registerPage.passwordError).toHaveText(expectedPasswordErrorMessage);
    await expect(registerPage.confirmPasswordError).toHaveText(expectedMatchPasswordError);
  });

  test('registration fails when confirm password field is empty', async ({ page }) => {
    // Arrange
    registerPage = new RegisterPage(page);
    const testEmail = 'user@test.com';
    const testPassoword = 'password';
    const expectedMatchPasswordError = 'Passwords do not match';

    // Act
    await registerPage.emailInput.fill(testEmail);
    await registerPage.passwordInput.fill(testPassoword);
    await registerPage.nextButton.click();

    // Assert
    await expect(registerPage.confirmPasswordError).toHaveText(expectedMatchPasswordError);
  });
});
