import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  url = '/';
  welcomeMessage: Locator;

  constructor(protected page: Page) {
    super(page);
    this.welcomeMessage = this.page.getByTestId('welcome-message');
  }

  async expectWelcomeMessage() {
    await expect(this.welcomeMessage).toHaveText('Welcome to Gym App!');
  }
}
