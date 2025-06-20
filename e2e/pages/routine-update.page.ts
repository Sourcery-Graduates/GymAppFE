import { Locator, Page } from '@playwright/test';
import { routineData } from '../test-data/routine.data';

export class RoutineUpdatePage {
  routineName: Locator;
  saveRoutineButton: Locator;

  constructor(private page: Page) {
    this.routineName = this.page.getByRole('textbox', { name: 'Routine name' });
    this.saveRoutineButton = this.page.getByTestId('save-routine-button');
  }

  async updateRoutine() {
    await this.routineName.fill(routineData.routineUpdatedName);
    await this.saveRoutineButton.click();
  }
}
