import { expect, Locator, Page } from '@playwright/test';

export class ForgotPasswordPage {
sendEmailButton: Locator;
errorMessage: Locator;
returnLoginPageLink: Locator;

  constructor(private page: Page) {
    this.sendEmailButton = this.page.getByTestId('send-email-button');
    this.errorMessage = this.page.locator('#\\:r1\\:-helper-text');
    this.returnLoginPageLink = this.page.getByTestId('return-login-page-link');

  }
  async expectToBeOnForgotPasswordPage() {
    await expect(this.page).toHaveURL('/forgot-password');
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
