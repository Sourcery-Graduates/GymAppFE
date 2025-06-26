import { expect, Locator, Page } from '@playwright/test';
import { WorkoutBasePage } from './workout-base.page';

export class WorkoutFormPage extends WorkoutBasePage {
  title: Locator;

  constructor(protected page: Page) {
    super(page);
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
}
