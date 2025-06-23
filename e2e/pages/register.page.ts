import { expect, Locator, Page } from '@playwright/test';

export class RegisterPage {
  emailInput: Locator;
  passwordInput: Locator;
  confirmPasswordInput: Locator;
  nextButton: Locator;
  backButton: Locator;
  emailError: Locator;
  passwordError: Locator;
  confirmPasswordError: Locator;

  usernameInput: Locator;
  firstNameInput: Locator;
  lastNameInput: Locator;
  usernameError: Locator;
  firstNameError: Locator;
  lastNameError: Locator;

  locationInput: Locator;
  bioInput: Locator;
  registerButton: Locator;
  userAlreadyExistsAlert: Locator;

  constructor(private page: Page) {
    this.emailInput = this.page.getByRole('textbox', { name: 'Email adress' });
    this.passwordInput = this.page.getByRole('textbox', { name: 'Password', exact: true });
    this.confirmPasswordInput = this.page.getByRole('textbox', { name: 'Confirm password', exact: true });
    this.nextButton = this.page.getByTestId('next-button');
    this.backButton = this.page.getByTestId('back-button');
    this.emailError = this.page.getByText('Email is required');
    this.passwordError = this.page.getByText('Password is required');
    this.confirmPasswordError = this.page.getByText('Passwords do not match');

    this.usernameInput = this.page.getByRole('textbox', { name: 'Username' });
    this.firstNameInput = this.page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = this.page.getByRole('textbox', { name: 'Last Name' });
    this.usernameError = this.page.getByText('Username is required');
    this.firstNameError = this.page.getByText('First name is required');
    this.lastNameError = this.page.getByText('Last name is required');

    this.locationInput = this.page.getByRole('textbox', { name: 'Location (Optional)' });
    this.bioInput = this.page.getByRole('textbox', { name: 'Bio (Optional)' });
    this.registerButton = this.page.getByTestId('register-button');
    this.userAlreadyExistsAlert = this.page.getByText('User already exists');
  }

  async expectToBeOnRegisterPage() {
    await expect(this.page).toHaveURL('/register');
    await expect(this.emailInput).toBeVisible();
    await expect(this.nextButton).toBeEnabled();
  }
  async stepOneRegister(email: string, password: string, confirmPassword: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.nextButton.click();
  }
  async stepTwoRegister(username: string, firstName: string, lastName: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.nextButton.click();
  }
  async stepThreeRegister(): Promise<void> {
    // Optional you can add Location and Bio
    await this.registerButton.click();
  }
  async expectEmailIsRequiredError() {
    await expect(this.emailError).toHaveText('Email is required');
  }
  async expectPasswordIsRequiredError() {
    await expect(this.passwordError).toHaveText('Password is required');
  }
  async expectPasswordsDoNotMatchError() {
    await expect(this.confirmPasswordError).toHaveText('Passwords do not match');
  }
  async expectUsernameIsRequiredError() {
    await expect(this.usernameError).toHaveText('Username is required');
  }
  async expectFirstNameIsRequiredError() {
    await expect(this.firstNameError).toHaveText('First name is required');
  }
  async expectLastNameIsRequiredError() {
    await expect(this.lastNameError).toHaveText('Last name is required');
  }
  async expectUserAlreadyExistsAlert() {
    await expect(this.userAlreadyExistsAlert).toBeVisible();
  }
  async expectBackButtonIsDisabled() {
    await expect(this.backButton).toBeDisabled();
  }
  async expectLocationBioFieldsAreVisible() {
    await expect(this.locationInput).toBeVisible();
    await expect(this.bioInput).toBeVisible();
  }
  async expectPreviousEnteredDataIsVisible(email: string, password: string, username: string, firstName: string, lastName: string) {
    await this.backButton.click();
    await expect(this.usernameInput).toHaveValue(username);
    await expect(this.firstNameInput).toHaveValue(firstName);
    await expect(this.lastNameInput).toHaveValue(lastName);
    await this.backButton.click();
    await expect(this.emailInput).toHaveValue(email);
    await expect(this.passwordInput).toHaveValue(password);
    await expect(this.passwordInput).toHaveValue(password);
  }
}
