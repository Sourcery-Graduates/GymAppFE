import { Locator, Page } from '@playwright/test';

export class RegisterPage {
  signUpText: Locator;
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
    this.signUpText = this.page.locator('#root > div > div.not_auth_layout_container > div > form > h1');
    this.emailInput = this.page.locator('#\\:r1\\:');
    this.passwordInput = this.page.locator('#\\:r3\\:');
    this.confirmPasswordInput = this.page.locator('#\\:r7\\:');
    this.nextButton = this.page.locator(
      '#root > div > div.not_auth_layout_container > div > form > div.MuiBox-root.css-2royc9 > button:nth-child(3)',
    );
    this.emailError = this.page.locator('#\\:r1\\:-helper-text');
    this.passwordError = this.page.locator('#\\:r3\\:-helper-text');
    this.confirmPasswordError = this.page.locator('#\\:r7\\:-helper-text');

    this.usernameInput = this.page.locator('#\\:rb\\:');
    this.firstNameInput = this.page.locator('#\\:rd\\:');
    this.lastNameInput = this.page.locator('#\\:rf\\:');
    this.usernameError = this.page.locator('#\\:rb\\:-helper-text');
    this.firstNameError = this.page.locator('#\\:rd\\:-helper-text');
    this.lastNameError = this.page.locator('#\\:rf\\:-helper-text');
  };

  async stepOneRegister(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.nextButton.click();
  };

  async stepTwoRegister(username: string, firstName: string, lastName: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.nextButton.click();
  };
}
