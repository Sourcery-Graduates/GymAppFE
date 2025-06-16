import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { ForgotPasswordPage } from '../../pages/forgot-password.page';

test.describe('User forgot the password', async () => {
  let loginPage: LoginPage;
  let forgotPasswordPage: ForgotPasswordPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    forgotPasswordPage = new ForgotPasswordPage(page);
    await loginPage.gotoForgotPasswordPage();
  });

  test('should navigate to forgot password page when link is clicked', async () => {
    // Assert
    await forgotPasswordPage.expectToBeOnForgotPasswordPage();
  });

  test('should display error message when email field is empty', async () => {
    // Assert
    await forgotPasswordPage.expectErrorMessage();
  });
  test('should navigate to login page when return link is clicked', async () => {
    // Act
    await forgotPasswordPage.returnToLoginPage();
    // Assert
    await loginPage.expectToBeOnLoginPage();
  });
});
