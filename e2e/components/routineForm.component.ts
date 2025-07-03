import { expect, Locator, Page } from '@playwright/test';

export class RoutineFormComponent {
  root: Locator;
  saveButton: Locator;
  name: Locator;
  description: Locator;
  addExerciseButton: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.saveButton = this.root.getByTestId('save-routine-button');
    this.name = this.root.getByTestId('routine-name');
    // this.routineName = this.page.getByRole('textbox', { name: 'Routine name' });
    this.description = this.root.getByTestId('routine-description');
    this.addExerciseButton = this.root.getByTestId('add-exercise-button');
  }

  static async getByName(page: Page, name: string): Promise<RoutineFormComponent> {
    const root = page.getByTestId('routine-form-component').filter({ hasText: name });
    await expect(root).toBeVisible();
    return new RoutineFormComponent(root);
  }
}
