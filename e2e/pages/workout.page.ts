import { expect, Locator, Page } from '@playwright/test';

export class WorkoutPage {
  title: Locator;
  deleteButton: Locator;
  deleteWorkoutConfirmationDialog: Locator;
  deleteWorkoutConfirmationButton: Locator;

  constructor(private page: Page) {
    this.title = this.page.getByRole('heading', { name: 'Workout' });
    this.deleteButton = this.page.getByTestId('delete-workout-button');
    this.deleteWorkoutConfirmationDialog = this.page.getByTestId('delete-workout-confirmation-dialog');
    this.deleteWorkoutConfirmationButton = this.page.getByTestId('delete-workout-confirmation-button');
  }

  async goto(workoutId: string) {
    await this.page.goto(`/my-training/${workoutId}`);
  }
  async expectHeadingToBeVisible() {
    await expect(this.title).toBeVisible();
  }
  async reloadPage() {
    await this.page.reload({ waitUntil: 'load' });
  }
  async deleteWorkout() {
    await this.deleteButton.click();
    await expect(this.deleteWorkoutConfirmationDialog).toHaveText('Are you sure you want to delete this Workout?');
    await this.deleteWorkoutConfirmationButton.click();
  }
}
