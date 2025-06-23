import { expect, Locator, Page } from '@playwright/test';

export class ExerciseCardComponent {
  root: Locator;
  cardBody: Locator;
  editIcon: Locator;
  stopEditingIcon: Locator;
  deleteIcon: Locator;
  setList: Locator;

  constructor(
    private page: Page,
    root: Locator,
  ) {
    this.root = root;
    this.cardBody = this.page.getByTestId('exercise-card-body');
    this.editIcon = this.page.getByTestId('edit-exercise-icon');
    this.stopEditingIcon = this.page.getByTestId('stop-editing-exercise-icon');
    this.deleteIcon = this.page.getByTestId('CloseIcon');
    this.setList = this.page.getByTestId('exercise-set-list').locator('ul > li');
  }

  static async getByName(page: Page, name: string): Promise<ExerciseCardComponent> {
    const root = page.getByTestId('exercise-card').filter({ hasText: name });
    await expect(root).toBeVisible();
    return new ExerciseCardComponent(page, root);
  }
  async clickEdit() {
    await this.editIcon.click();
  }
  async stopEditing() {
    await this.stopEditingIcon.click();
  }
  async deleteSetByIndex(index: number) {
    const deleteIcons = this.cardBody.getByTestId('CloseIcon');
    await deleteIcons.nth(index).click();
    const count = await this.setList.count();
    await expect(count).toBe(2);
  }
}
