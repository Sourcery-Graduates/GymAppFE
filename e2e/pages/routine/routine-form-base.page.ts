import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class RoutineFormBasePage extends BasePage {
  routineName: Locator;
  saveRoutineButton: Locator;

  constructor(
    protected page: Page,
    protected readonly url: string,
  ) {
    super(page, url);
    this.routineName = this.page.getByRole('textbox', { name: 'Routine name' });
    this.saveRoutineButton = this.page.getByTestId('save-routine-button');
  }

  async updateRoutine(name: string) {
    await this.routineName.fill(name);
    await this.saveRoutineButton.click();
  }
}
