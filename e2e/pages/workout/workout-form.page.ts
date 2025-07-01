import { expect, Locator, Page } from '@playwright/test';
import { WorkoutBasePage } from './workout-base.page';
import { RoutineExercise } from '../../test-data/exercises.data';

export class WorkoutFormPage extends WorkoutBasePage {
  title: Locator;

  constructor(protected page: Page) {
    super(page, '/my-training/new');
    this.title = this.page.getByRole('heading', { name: 'New Workout' });
  }

  async expectHeadingToBeVisible() {
    await expect(this.title).toBeVisible();
  }
  async createWorkoutAndGetWorkoutId(): Promise<string> {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (response) => response.url().includes('/api/workout/workout') && response.request().method() === 'POST',
      ),
      super.clickCreateSaveButton(),
    ]);

    const data = await response.json();
    return data.id;
  }
  async validateWorkoutForm(formattedDate: string, name: string, comment: string, exercises: RoutineExercise[]) {
    await this.expectHeadingToBeVisible();
    await super.validateWorkoutData(formattedDate, name, comment, exercises);
  }
}
