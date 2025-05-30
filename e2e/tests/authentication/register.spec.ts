import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { RegisterPage } from '../../pages/register.page';
import { registerData } from '../../test-data/register.data';

test.describe('Registration tests', async () => {
  let loginPage: LoginPage;
  let registerPage: RegisterPage;
  const testEmail = registerData.userEmail;
  const testPassword = registerData.userPassword;
  const testUsername = registerData.userUsername;
  const testFirstName = registerData.userFirstName;
  const testLastName = registerData.userLastName;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);

    await page.goto('/');
    await loginPage.registerLink.click();
  });

  test('register link redirects to registration form', async ({ page }) => {
    // Assert
    await expect(page).toHaveURL('/register');
    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.nextButton).toBeEnabled();
  });

  test('registration fails when email field is empty', async () => {
    // Arrange
    const expectedEmailErrorMessage = 'Email is required';

    // Act
    await registerPage.passwordInput.fill(testPassword);
    await registerPage.confirmPasswordInput.fill(testPassword);
    await registerPage.nextButton.click();

    // Assert
    await expect(registerPage.emailError).toHaveText(expectedEmailErrorMessage);
  });

  test('registration fails when password field is empty', async () => {
    // Arrange
    const expectedPasswordErrorMessage = 'Password is required';
    const expectedMatchPasswordError = 'Passwords do not match';

    // Act
    await registerPage.emailInput.fill(testEmail);
    await registerPage.confirmPasswordInput.fill(testPassword);
    await registerPage.nextButton.click();

    // Assert
    await expect(registerPage.passwordError).toHaveText(expectedPasswordErrorMessage);
    await expect(registerPage.confirmPasswordError).toHaveText(expectedMatchPasswordError);
  });

  test('registration fails when confirm password field is empty', async () => {
    // Arrange
    const expectedMatchPasswordError = 'Passwords do not match';

    // Act
    await registerPage.emailInput.fill(testEmail);
    await registerPage.passwordInput.fill(testPassword);
    await registerPage.nextButton.click();

    // Assert
    await expect(registerPage.confirmPasswordError).toHaveText(expectedMatchPasswordError);
  });

  test('registration fails when username field is empty', async () => {
    // Arrange
    const expectedUsernameError = 'Username is required';

    // Act
    await registerPage.stepOneRegister(testEmail, testPassword);
    await registerPage.firstNameInput.fill(testFirstName);
    await registerPage.lastNameInput.fill(testLastName);
    await registerPage.nextButton.click();

    // Assert
    await expect(registerPage.usernameError).toHaveText(expectedUsernameError);
  });

  test('registration fails when first name field is empty', async () => {
    // Arrange
    const expectedFirstNameError = 'First name is required';

    // Act
    await registerPage.stepOneRegister(testEmail, testPassword);
    await registerPage.emailInput.fill(testEmail);
    await registerPage.lastNameInput.fill(testLastName);
    await registerPage.nextButton.click();

    // Assert
    await expect(registerPage.firstNameError).toHaveText(expectedFirstNameError);
  });

  test('registration fails when last name field is empty', async () => {
    // Arrange
    const expectedLastNameError = 'Last name is required';

    // Act
    await registerPage.stepOneRegister(testEmail, testPassword);
    await registerPage.usernameInput.fill(testUsername);
    await registerPage.firstNameInput.fill(testFirstName);
    await registerPage.nextButton.click();

    // Assert
    await expect(registerPage.lastNameError).toHaveText(expectedLastNameError);
  });
});
