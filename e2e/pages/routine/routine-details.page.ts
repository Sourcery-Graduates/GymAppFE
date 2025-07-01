import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class RoutineDetailsPage extends BasePage {
  url: string;
  deleteRoutineButton: Locator;
  deleteRoutineConfirmationButton: Locator;
  startWorkoutButton: Locator;

  constructor(
    protected page: Page,
    private routineId: string,
  ) {
    super(page);
    this.url = `/routines/routine-details/${routineId}`;
    this.deleteRoutineButton = this.page.getByTestId('routine-details-delete-routine-button');
    this.deleteRoutineConfirmationButton = this.page.getByTestId('delete-workout-confirmation-button');
    this.startWorkoutButton = this.page.getByTestId('start-workout-button');
  }

  async deleteRoutine() {
    await this.deleteRoutineButton.click();
    await this.deleteRoutineConfirmationButton.click();
  }

  async startWorkout() {
    await this.startWorkoutButton.click();
  }
}
