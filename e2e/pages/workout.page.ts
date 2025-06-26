import { expect, Locator, Page } from '@playwright/test';
import { ExerciseCardComponent } from '../components/exerciseCard.component';
import { WorkoutBasePage } from './workout-base.page';

export class WorkoutPage extends WorkoutBasePage {
  title: Locator;
  saveWorkoutConfirmationAlert: Locator;
  deleteButton: Locator;
  deleteWorkoutConfirmationDialog: Locator;
  deleteWorkoutConfirmationButton: Locator;

  constructor(protected page: Page) {
    super(page);
    this.title = this.page.getByRole('heading', { name: 'Workout' });
    this.saveWorkoutConfirmationAlert = this.page.getByText('Workout saved successfully');
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
  async saveWorkout() {
    await super.clickCreateSaveButton();
  }
  async expectSaveSuccessAlert() {
    await expect(this.saveWorkoutConfirmationAlert).toBeVisible();
  }
  async removeSetFromExercise(exerciseName: string, setIndex: number) {
    const exerciseCard = await ExerciseCardComponent.getByName(this.page, exerciseName);
    await exerciseCard.clickEdit();
    await exerciseCard.deleteSetByIndex(setIndex);
    await exerciseCard.stopEditing();
  }
  async expectExerciseToHaveSetCount(exerciseName: string, setCount: number) {
    const exerciseCard = await ExerciseCardComponent.getByName(this.page, exerciseName);
    const count = await exerciseCard.setList.count();
    await expect(count).toBe(setCount);
  }
}
