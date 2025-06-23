import { expect, Locator, Page } from '@playwright/test';
import { ExerciseCardComponent } from '../components/exerciseCard.component';

export class WorkoutPage {
  title: Locator;
  deleteButton: Locator;
  createSaveButton: Locator;

  saveWorkoutConfirmationAlert: Locator;
  deleteWorkoutConfirmationDialog: Locator;
  deleteWorkoutConfirmationButton: Locator;

  workoutName: Locator;
  workoutComment: Locator;

  constructor(private page: Page) {
    this.title = this.page.getByRole('heading', { name: 'Workout' });
    this.deleteButton = this.page.getByTestId('delete-workout-button');
    this.createSaveButton = this.page.getByTestId('create-save-workout-button');

    this.saveWorkoutConfirmationAlert = this.page.getByText('Workout saved successfully');
    this.deleteWorkoutConfirmationDialog = this.page.getByTestId('delete-workout-confirmation-dialog');
    this.deleteWorkoutConfirmationButton = this.page.getByTestId('delete-workout-confirmation-button');

    this.workoutName = this.page.getByTestId('workout-name').locator('input');
    this.workoutComment = this.page.getByTestId('workout-comment').locator('textarea:not([readonly])');
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
  async expectToUpdateName(name: string) {
    await this.workoutName.fill('');
    await this.workoutName.fill(name);
    await expect(this.workoutName).toHaveValue(name);
  }
  async expectToUpdateComment(comment: string) {
    await this.workoutComment.fill('');
    await this.workoutComment.fill(comment);
    await expect(this.workoutComment).toHaveValue(comment);
  }
  async expectNameToBeUpdated(name: string) {
    await expect(this.workoutName).toBeVisible();
    await expect(this.workoutName).toHaveValue(name);
  }
  async expectCommentToBeUpdated(comment: string) {
    await expect(this.workoutComment).toBeVisible();
    await expect(this.workoutComment).toHaveValue(comment);
  }
  async expectAlertToBeVisible() {
    await expect(this.saveWorkoutConfirmationAlert).toBeVisible();
  }
  async expectToRemoveSetFromExercise(exerciseName: string, setIndex: number) {
    const exerciseCard = await ExerciseCardComponent.getByName(this.page, exerciseName);
    await exerciseCard.clickEdit();
    await exerciseCard.deleteSetByIndex(setIndex);
    await exerciseCard.stopEditing();
  }
  async expectToHaveSetsInExercise(exerciseName: string, setCount: number) {
    const exerciseCard = await ExerciseCardComponent.getByName(this.page, exerciseName);
    const count = await exerciseCard.setList.count();
    await expect(count).toBe(setCount);
  }
}
