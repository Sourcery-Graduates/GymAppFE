import { Locator, Page } from '@playwright/test';

export class RoutineDetailsPage {
  deleteRoutineButton: Locator;
  deleteRoutineConfirmationButton: Locator;

  constructor(private page: Page) {
    this.deleteRoutineButton = this.page.getByTestId('routine-details-delete-routine-button');
    this.deleteRoutineConfirmationButton = this.page.getByTestId('delete-workout-confirmation-button');
  }

  async deleteRoutine() {
    await this.deleteRoutineButton.click();
    await this.deleteRoutineConfirmationButton.click();
  }
}
