import { Locator, Page } from '@playwright/test';
import { routineData } from '../../test-data/routine.data';
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

  async updateRoutine() {
    await this.routineName.fill(routineData.routineUpdatedName);
    await this.saveRoutineButton.click();
  }
}
