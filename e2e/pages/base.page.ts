import { expect, Page } from '@playwright/test';

export class BasePage {
  constructor(
    protected page: Page,
    protected readonly url: string,
  ) {}

  async goto() {
    await this.page.goto(this.url);
  }
  async reloadPage() {
    await this.page.reload({ waitUntil: 'load' });
  }
  async expectToHaveURL() {
    await expect(this.page).toHaveURL(this.url);
  }
}
