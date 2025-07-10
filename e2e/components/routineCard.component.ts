import { expect, Locator, Page } from '@playwright/test';
import { RoutineDetailsPage } from '../pages/routine/routine-details.page';

export class RoutineCardComponent {
  root: Locator;
  name: Locator;
  description: Locator;
  optionsButton: Locator;
  clickableArea: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.name = this.root.getByTestId('routine-item-title');
    this.description = this.root.getByTestId('routine-item-description');
    this.optionsButton = this.root.getByTestId('MoreVertIcon');
    this.clickableArea = this.root.getByTestId('routine-item-title-container');
  }

  static async getByRoutineId(page: Page, routineId: string): Promise<RoutineCardComponent> {
    const root = page.getByTestId(`routine-item-${routineId}`);
    await expect(root).toBeVisible();
    return new RoutineCardComponent(root);
  }

  async click(page: Page, routineId: string): Promise<RoutineDetailsPage> {
    await this.clickableArea.click();
    return new RoutineDetailsPage(page, routineId);
  }
}
