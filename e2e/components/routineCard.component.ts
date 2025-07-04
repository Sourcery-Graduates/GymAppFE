import { expect, Locator, Page } from '@playwright/test';
import { RoutineDetailsPage } from '../pages/routine/routine-details.page';

export class RoutineCardComponent {
  root: Locator;
  name: Locator;
  description: Locator;
  optionsButton: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.name = this.root.getByTestId('routine-item-title');
    this.description = this.root.getByTestId('routine-item-description');
    this.optionsButton = this.root.getByTestId('MoreVertIcon');
  }

  static async getByName(page: Page, name: string): Promise<RoutineCardComponent> {
    const root = page.getByTestId('routine-item').filter({ hasText: name });
    await expect(root).toBeVisible();
    return new RoutineCardComponent(root);
  }

  async click(page: Page, routineId: string): Promise<RoutineDetailsPage> {
    await this.root.click();
    return new RoutineDetailsPage(page, routineId);
  }
}
