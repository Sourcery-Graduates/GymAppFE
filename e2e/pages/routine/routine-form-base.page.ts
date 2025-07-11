import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { AddExerciseCardComponent } from '../../components/addExerciseCard.component';
import { RoutinesPage } from '../routines.page';

export class RoutineFormBasePage extends BasePage {
  name: Locator;
  description: Locator;
  saveRoutineButton: Locator;
  addExerciseButton: Locator;

  constructor(
    protected page: Page,
    protected readonly url: string,
  ) {
    super(page, url);
    this.name = this.page.getByTestId('routine-name').locator('input');
    this.description = this.page.getByTestId('routine-description').locator('textarea:not([readonly])');
    this.saveRoutineButton = this.page.getByTestId('save-routine-button');
    this.addExerciseButton = this.page.getByTestId('add-exercise-button');
  }

  async updateRoutine(name: string): Promise<RoutinesPage> {
    await this.name.fill(name);
    await this.saveRoutineButton.click();
    return new RoutinesPage(this.page);
  }

  async addExercise(): Promise<AddExerciseCardComponent> {
    this.addExerciseButton.click();
    return new AddExerciseCardComponent(this.page);
  }

  async saveAndGetRoutineId(): Promise<string> {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (response) => response.url().includes('/api/workout/routine') && response.request().method() === 'POST',
      ),
      this.saveRoutineButton.click(),
    ]);

    const data = await response.json();
    return data.id;
  }
}
