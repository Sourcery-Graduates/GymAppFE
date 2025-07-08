import { expect, Locator, Page } from '@playwright/test';
import { WorkoutBasePage } from './workout-base.page';
import { RoutineExercise } from '../../test-data/exercises.data';
import { WorkoutHelper } from '../../helpers/workoutHelper';
import { DataTestManager } from '../../test-utils/dataTestManager';

export class WorkoutFormPage extends WorkoutBasePage {
  title: Locator;

  constructor(protected page: Page) {
    super(page, '/my-training/new');
    this.title = this.page.getByRole('heading', { name: 'New Workout' });
  }

  async expectHeadingToBeVisible() {
    await expect(this.title).toBeVisible();
  }
  async createWorkoutAndGetWorkoutId(workoutHelper: WorkoutHelper, dataTestManager: DataTestManager): Promise<string> {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (response) => response.url().includes('/api/workout/workout') && response.request().method() === 'POST',
      ),
      super.clickCreateSaveButton(),
    ]);

    const data = await response.json();
    await workoutHelper.registerWorkoutCleanup(data.id, dataTestManager);
    return data.id;
  }
  async validateWorkoutForm(formattedDate: string, name: string, comment: string, exercises: RoutineExercise[]) {
    await this.expectHeadingToBeVisible();
    await super.validateWorkoutData(formattedDate, name, comment, exercises);
  }
}
