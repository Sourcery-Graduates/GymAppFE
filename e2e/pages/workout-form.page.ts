import { expect, Locator, Page } from '@playwright/test';

export class WorkoutFormPage {
  startWorkoutButton: Locator;
  heading: Locator;
  date: Locator;
  workoutName: Locator;
  workoutComment: Locator;

  constructor(private page: Page) {
    this.startWorkoutButton = this.page.getByTestId('create-save-workout-button');
    this.heading = this.page.getByTestId('workout-create-header');
    this.date = this.page.getByLabel('Workout Date');
    this.workoutName = this.page.getByTestId('workout-name').locator('input');
    this.workoutComment = this.page.getByTestId('workout-comment').locator('textarea:not([readonly])');
  }

  async startWorkout() {
    await this.startWorkoutButton.click();
  }
  async expectHeadingToBeVisible() {
    await expect(this.heading).toBeVisible();
  }
  async expectDateToBe(date: string) {
    await expect(this.date).toHaveValue(date);
  }
  async updateWorkoutName(name: string) {
    await this.workoutName.fill('');
    await this.workoutName.fill(name);
    await this.expectNameToBe(name);
  }
  async updateWorkoutComment(comment: string) {
    await this.workoutComment.fill('');
    await this.workoutComment.fill(comment);
    await this.expectCommentToBe(comment);
  }
  async expectNameToBe(name: string) {
    await expect(this.workoutName).toBeVisible();
    await expect(this.workoutName).toHaveValue(name);
  }
  async expectCommentToBe(comment: string) {
    await expect(this.workoutComment).toBeVisible();
    await expect(this.workoutComment).toHaveValue(comment);
  }
}
