import { expect, Locator, Page } from '@playwright/test';
import { WorkoutPage } from '../pages/workout/workout.page';

export class WorkoutCardComponent {
  root: Locator;
  name: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.name = this.root.getByTestId('workout-card-name');
  }

  static async getByWorkoutId(page: Page, workoutId: string): Promise<WorkoutCardComponent> {
    const root = page.getByTestId(`workout-card-${workoutId}`);
    await expect(root).toBeVisible();
    return new WorkoutCardComponent(root);
  }

  async click(page: Page, workoutId: string): Promise<WorkoutPage> {
    await this.root.click();
    return new WorkoutPage(page, workoutId);
  }
}
