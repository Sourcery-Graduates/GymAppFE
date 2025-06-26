import { expect, Locator, Page } from '@playwright/test';
import { ExerciseCardComponent } from '../components/exerciseCard.component';
import { RoutineExercise } from '../test-data/exercises.data';

export class WorkoutPage {
  title: Locator;
  deleteButton: Locator;
  createSaveButton: Locator;

  saveWorkoutConfirmationAlert: Locator;
  deleteWorkoutConfirmationDialog: Locator;
  deleteWorkoutConfirmationButton: Locator;

  date: Locator;
  workoutName: Locator;
  workoutComment: Locator;

  constructor(private page: Page) {
    this.title = this.page.getByRole('heading', { name: 'Workout' });
    this.deleteButton = this.page.getByTestId('delete-workout-button');
    this.createSaveButton = this.page.getByTestId('create-save-workout-button');

    this.saveWorkoutConfirmationAlert = this.page.getByText('Workout saved successfully');
    this.deleteWorkoutConfirmationDialog = this.page.getByTestId('delete-workout-confirmation-dialog');
    this.deleteWorkoutConfirmationButton = this.page.getByTestId('delete-workout-confirmation-button');

    this.date = this.page.getByLabel('Workout Date');
    this.workoutName = this.page.getByTestId('workout-name').locator('input');
    this.workoutComment = this.page.getByTestId('workout-comment').locator('textarea:not([readonly])');
  }

  async goto(workoutId: string) {
    await this.page.goto(`/my-training/${workoutId}`);
  }
  async expectHeadingToBeVisible() {
    await expect(this.title).toBeVisible();
  }
  async expectDateToBe(date: string) {
    await expect(this.date).toHaveValue(date);
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
    await this.createSaveButton.click();
  }
  async updateWorkoutName(name: string) {
    await this.workoutName.fill('');
    await this.workoutName.fill(name);
    await this.expectNameToBeUpdated(name);
  }
  async updateWorkoutComment(comment: string) {
    await this.workoutComment.fill('');
    await this.workoutComment.fill(comment);
    await this.expectCommentToBeUpdated(comment);
  }
  async expectNameToBeUpdated(name: string) {
    await expect(this.workoutName).toBeVisible();
    await expect(this.workoutName).toHaveValue(name);
  }
  async expectCommentToBeUpdated(comment: string) {
    await expect(this.workoutComment).toBeVisible();
    await expect(this.workoutComment).toHaveValue(comment);
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
  async getAllExerciseCards(): Promise<ExerciseCardComponent[]> {
    const roots = this.page.getByTestId('exercise-card');
    const count = await roots.count();
    const cards: ExerciseCardComponent[] = [];

    for (let i = 0; i < count; i++) {
      cards.push(new ExerciseCardComponent(roots.nth(i)));
    }

    return cards;
  }
  async expectWorkoutContainsExercises(exercises: RoutineExercise[]) {
    const cards = await this.getAllExerciseCards();
    expect(cards.length).toBe(exercises.length);

    const actualNames = await Promise.all(cards.map((card) => card.getHeading()));
    const expectedNames = await Promise.all(exercises.map((card) => card.exercise.name));
    expect(actualNames).toEqual(expect.arrayContaining(expectedNames));
  }
}
