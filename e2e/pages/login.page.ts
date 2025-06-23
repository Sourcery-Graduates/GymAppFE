import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  heading: Locator;
  emailInput: Locator;
  passwordInput: Locator;
  forgotPasswordLink: Locator;
  loginButton: Locator;
  credentialsError: Locator;
  registerLink: Locator;

  constructor(private page: Page) {
    this.heading = this.page.getByRole('heading', { name: 'Sign in' });
    this.emailInput = this.page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
    this.forgotPasswordLink = this.page.locator('body > div > form > div.forgot-password-container > p > a');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
    this.credentialsError = this.page.locator('#credentials-error-toast > div > span');
    this.registerLink = this.page.locator('body > div > div.register-container > p > a');
  }

  async goto() {
    await this.page.goto('/');
  }
  async gotoRegisterPage() {
    await this.page.goto('/');
    await this.registerLink.click();
  }
  async gotoForgotPasswordPage() {
    await this.page.goto('/');
    await this.forgotPasswordLink.click();
  }
  async expectHeadingToBeVisible() {
    await expect(this.heading).toBeVisible();
  }
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
  async expectErrorMessage() {
    await expect(this.credentialsError).toHaveText('Invalid email or password. Please try again.');
  }
  async expectToBeOnLoginPage() {
    await expect(this.page).toHaveURL('http://localhost:8080/login');
    await expect(this.loginButton).toBeVisible();
  }
}
