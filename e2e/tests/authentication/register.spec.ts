import { test } from '@playwright/test';
import { RegisterPage } from '../../pages/register.page';
import { registerData } from '../../test-data/register.data';
import { LoginPage } from '../../pages/login.page';

test.describe('Registration tests', async () => {
  let registerPage: RegisterPage;
  let loginPage: LoginPage;
  const testEmail = registerData.userEmail;
  const testPassword = registerData.userPassword;
  const testUsername = registerData.userUsername;
  const testFirstName = registerData.userFirstName;
  const testLastName = registerData.userLastName;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    loginPage = new LoginPage(page);
    await loginPage.gotoRegisterPage();
  });

  test('register link redirects to registration form', async () => {
    // Assert
    await registerPage.expectToBeOnRegisterPage();
  });

  test('registration fails when email field is empty', async () => {
    // Act
    await registerPage.stepOneRegister('', testPassword, testPassword);

    // Assert
    await registerPage.expectEmailIsRequiredError();
  });

  test('registration fails when password field is empty', async () => {
    // Act
    await registerPage.stepOneRegister(testEmail, '', testPassword);

    // Assert
    await registerPage.expectPasswordIsRequiredError();
    await registerPage.expectPasswordsDoNotMatchError();
  });

  test('registration fails when confirm password field is empty or do not match', async () => {
    // Act
    await registerPage.stepOneRegister(testEmail, testPassword, '');

    // Assert
    await registerPage.expectPasswordsDoNotMatchError();
  });

  test('registration fails when username field is empty', async () => {
    // Act
    await registerPage.stepOneRegister(testEmail, testPassword, testPassword);
    await registerPage.stepTwoRegister('', testFirstName, testLastName);

    // Assert
    await registerPage.expectUsernameIsRequiredError();
  });

  test('registration fails when first name field is empty', async () => {
    // Act
    await registerPage.stepOneRegister(testEmail, testPassword, testPassword);
    await registerPage.stepTwoRegister(testUsername, '', testLastName);

    // Assert
    await registerPage.expectFirstNameIsRequiredError();
  });

  test('registration fails when last name field is empty', async () => {
    // Act
    await registerPage.stepOneRegister(testEmail, testPassword, testPassword);
    await registerPage.stepTwoRegister(testUsername, testFirstName, '');

    // Assert
    await registerPage.expectLastNameIsRequiredError();
  });

  test('registration fails with already registered email', async () => {
    await registerPage.stepOneRegister(process.env.USER_EMAIL!, testPassword, testPassword);
    await registerPage.stepTwoRegister(testUsername, testFirstName, testLastName);
    await registerPage.submitRegistration();
    await registerPage.expectUserAlreadyExistsAlert();
  });
  
  test('registration - Back/Next button behaviour', async () => {
    await registerPage.expectBackButtonIsDisabled();
    await registerPage.stepOneRegister(testEmail, testPassword, testPassword);
    await registerPage.stepTwoRegister(testUsername, testFirstName, testLastName);
    await registerPage.expectLocationBioFieldsAreVisible();
    await registerPage.expectPreviousEnteredDataIsVisible(testEmail, testPassword, testUsername, testFirstName, testLastName);
  })
});
