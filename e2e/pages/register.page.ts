import { expect, Locator, Page } from '@playwright/test';

export class RegisterPage {
  emailInput: Locator;
  passwordInput: Locator;
  confirmPasswordInput: Locator;
  nextButton: Locator;
  emailError: Locator;
  passwordError: Locator;
  confirmPasswordError: Locator;

  usernameInput: Locator;
  firstNameInput: Locator;
  lastNameInput: Locator;
  usernameError: Locator;
  firstNameError: Locator;
  lastNameError: Locator;

  constructor(private page: Page) {
    this.emailInput = this.page.locator('#\\:r1\\:');
    this.passwordInput = this.page.locator('#\\:r3\\:');
    this.confirmPasswordInput = this.page.locator('#\\:r7\\:');
    this.nextButton = this.page.getByTestId('next-button');
    this.emailError = this.page.locator('#\\:r1\\:-helper-text');
    this.passwordError = this.page.locator('#\\:r3\\:-helper-text');
    this.confirmPasswordError = this.page.locator('#\\:r7\\:-helper-text');

    this.usernameInput = this.page.locator('#\\:rb\\:');
    this.firstNameInput = this.page.locator('#\\:rd\\:');
    this.lastNameInput = this.page.locator('#\\:rf\\:');
    this.usernameError = this.page.locator('#\\:rb\\:-helper-text');
    this.firstNameError = this.page.locator('#\\:rd\\:-helper-text');
    this.lastNameError = this.page.locator('#\\:rf\\:-helper-text');
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
}
