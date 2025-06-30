import { expect, Locator, Page } from '@playwright/test';

export class ExerciseCardComponent {
  root: Locator;
  cardBody: Locator;
  editIcon: Locator;
  stopEditingIcon: Locator;
  deleteIcon: Locator;
  setList: Locator;
  heading: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.cardBody = this.root.getByTestId('exercise-card-body');
    this.editIcon = this.root.getByTestId('edit-exercise-icon');
    this.stopEditingIcon = this.root.getByTestId('stop-editing-exercise-icon');
    this.deleteIcon = this.root.getByTestId('CloseIcon');
    this.setList = this.root.getByTestId('exercise-set-list').locator('ul > li');
    this.heading = this.root.getByTestId('exercise-card-header').locator('h6');
  }

  static async getByName(page: Page, name: string): Promise<ExerciseCardComponent> {
    const root = page.getByTestId('exercise-card').filter({ hasText: name });
    await expect(root).toBeVisible();
    return new ExerciseCardComponent(root);
  }
  async getHeading(): Promise<string> {
    return await this.heading.innerText();
  }
  async clickEdit() {
    await this.editIcon.click();
    await expect(this.stopEditingIcon).toBeVisible();
  }
  async stopEditing() {
    await this.stopEditingIcon.click();
    await expect(this.editIcon).toBeVisible();
  }
  async deleteSetByIndex(index: number) {
    const deleteIcons = this.cardBody.getByTestId('CloseIcon');
    await deleteIcons.nth(index).click();
  }
  async deleteExerciseCard() {
    await this.deleteIcon.click();
  }
}
