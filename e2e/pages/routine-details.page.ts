import { Locator, Page } from '@playwright/test';

export class RoutineDetailsPage {
  deleteRoutineButton: Locator;
  deleteRoutineConfirmationButton: Locator;

  constructor(private page: Page) {
    this.deleteRoutineButton = this.page.locator(
      '#root > div > div.layout_outlet > div > div.routine-options-bar > div > button.basic-button.delete-routine-button.small',
    );
    this.deleteRoutineConfirmationButton = this.page.getByTestId('delete-workout-confirmation-button');
  }

  async deleteRoutine() {
    await this.deleteRoutineButton.click();
    await this.deleteRoutineConfirmationButton.click();
  }
}
