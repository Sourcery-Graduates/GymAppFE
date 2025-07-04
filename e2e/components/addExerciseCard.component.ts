import { expect, Locator, Page } from '@playwright/test';

export class AddExerciseCardComponent {
  heading: Locator;
  chooseExerciseField: Locator;
  saveButton: Locator;

  constructor(private page: Page) {
    this.heading = this.page.getByRole('heading', { name: 'Add exercise' });
    this.chooseExerciseField = this.page.getByTestId('choose-exercise').locator('input');
    this.saveButton = this.page.getByTestId('save-button');
  }

  async expectHeadingToBeVisible() {
    await expect(this.heading).toBeVisible();
  }
  async chooseExercise() {
    await this.chooseExerciseField.fill('push');
    await this.page.getByRole('option', { name: 'Push Press', exact: true }).click();
  }
}
