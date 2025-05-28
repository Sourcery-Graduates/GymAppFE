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
  }
}
