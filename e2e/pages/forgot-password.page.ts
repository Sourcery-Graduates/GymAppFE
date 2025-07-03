import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ForgotPasswordPage extends BasePage {
  sendEmailButton: Locator;
  errorMessage: Locator;
  returnLoginPageLink: Locator;

  constructor(protected page: Page) {
    super(page, '/forgot-password');
    this.sendEmailButton = this.page.getByTestId('send-email-button');
    this.errorMessage = this.page.locator('#\\:r1\\:-helper-text');
    this.returnLoginPageLink = this.page.getByTestId('return-login-page-link');
  }
  async expectToBeOnForgotPasswordPage() {
    await super.expectToHaveURL();
    await expect(this.sendEmailButton).toBeVisible();
  }
  async expectErrorMessage() {
    await this.sendEmailButton.click();
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText('Email is required');
  }
  async returnToLoginPage() {
    await this.returnLoginPageLink.click();
  }
}
