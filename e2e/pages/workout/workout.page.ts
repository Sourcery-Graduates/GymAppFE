import { expect, Locator, Page } from '@playwright/test';
import { ExerciseCardComponent } from '../../components/exerciseCard.component';
import { WorkoutBasePage } from './workout-base.page';
import { RoutineExercise } from '../../models/exercises.data';
import { MyTrainingPage } from '../my-training.page';

export class WorkoutPage extends WorkoutBasePage {
  title: Locator;
  saveWorkoutConfirmationAlert: Locator;
  deleteButton: Locator;
  deleteWorkoutConfirmationDialog: Locator;
  deleteWorkoutConfirmationButton: Locator;

  constructor(
    protected page: Page,
    private workoutId: string,
  ) {
    super(page, `/my-training/${workoutId}`);
    this.title = this.page.getByRole('heading', { name: 'Workout' });
    this.saveWorkoutConfirmationAlert = this.page.getByText('Workout saved successfully');
    this.deleteButton = this.page.getByTestId('delete-workout-button');
    this.deleteWorkoutConfirmationDialog = this.page.getByTestId('delete-workout-confirmation-dialog');
    this.deleteWorkoutConfirmationButton = this.page.getByTestId('delete-workout-confirmation-button');
  }

  async expectHeadingToBeVisible() {
    await expect(this.title).toBeVisible();
  }
  async deleteWorkout(): Promise<MyTrainingPage> {
    await this.deleteButton.click();
    await expect(this.deleteWorkoutConfirmationDialog).toHaveText('Are you sure you want to delete this Workout?');
    await this.deleteWorkoutConfirmationButton.click();
    return new MyTrainingPage(this.page);
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
  async validateWorkout(formattedDate: string, name: string, comment: string, exercises: RoutineExercise[]) {
    await this.expectHeadingToBeVisible();
    await super.validateWorkoutData(formattedDate, name, comment, exercises);
  }
}
