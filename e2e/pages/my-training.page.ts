import { Locator, Page } from '@playwright/test';

export class MyTrainingPage {
  title: Locator;
  selectView: Locator;

  constructor(private page: Page) {
    this.title = this.page.getByTestId('my-training-title');
    this.selectView = this.page.getByTestId('my-training-select');
  }
}
