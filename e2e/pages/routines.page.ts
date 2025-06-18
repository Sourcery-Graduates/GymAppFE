import { expect, Locator, Page } from '@playwright/test';
import { routineData } from '../test-data/routine.data';

export class RoutinesPage {
  myRoutines: Locator;
  publicRoutines: Locator;

  newRoutineButton: Locator;
  routineName: Locator;
  routineDesciption: Locator;
  addExerciseButton: Locator;
  saveRoutineButton: Locator;

  chooseExercise: Locator;
  saveButton: Locator;

  routineOptions: Locator;
  editRoutineButton: Locator;
  deleteRoutineButton: Locator;
  deleteRoutineConfirmationButton: Locator;
  routineList: Locator;
  routineItem: Locator;
  routineItemTitle: Locator;

  constructor(private page: Page) {
    this.myRoutines = this.page.getByTestId('my-routines');
    this.publicRoutines = this.page.getByTestId('public-routines');

    this.newRoutineButton = this.page.getByTestId('new-routine-button');
    this.routineName = this.page.locator('#\\:r7\\:');
    this.routineDesciption = this.page.locator('#\\:r9\\:');
    this.addExerciseButton = this.page.getByTestId('add-exercise-button');
    this.saveRoutineButton = this.page.getByTestId('save-routine-button');

    this.chooseExercise = this.page.locator('#\\:rd\\:');
    this.saveButton = this.page.getByTestId('save-button');

    this.routineOptions = this.page.getByRole('button', { name: 'Routine options' });
    this.editRoutineButton = this.page.getByText('Edit Routine');
    this.deleteRoutineButton = this.page.getByText('Delete Routine');
    this.deleteRoutineConfirmationButton = this.page.getByTestId('delete-workout-confirmation-button');

    this.routineList = this.page.locator('#root > div > div.layout_outlet > div > div.routine-list-wrapper > div');
    this.routineItem = this.page.locator(
      '#root > div > div.layout_outlet > div > div.routine-list-wrapper > div > div.routine-list-item_name > h3',
    );
    this.routineItemTitle = this.page.locator(
      '#root > div > div.layout_outlet > div > div.routine-list-wrapper > div > div.routine-list-item_name > h3 > title',
    );
  }

  async goto() {
    await this.page.goto('/routines');
  }
  async reloadPage() {
    await this.page.reload({ waitUntil: 'load' });
  }
  async expectHeadingToBeVisible() {
    await expect(this.myRoutines).toHaveText('My Routines');
    await expect(this.publicRoutines).toHaveText('Public Routines');
  }
  async getRoutineId(page: Page, saveRoutineButton: Locator): Promise<string> {
    const [response] = await Promise.all([
      page.waitForResponse(
        (response) => response.url().includes('/api/workout/routine') && response.request().method() === 'POST',
      ),
      saveRoutineButton.click(),
    ]);

    const data = await response.json();
    return data.id;
  }
  async addNewRoutineWithNoExercise() {
    await this.newRoutineButton.click();
    await this.routineName.fill('Empty Test Routine');
    await this.routineDesciption.fill('This is a test routine without any exercises.');

    const routineId = await this.getRoutineId(this.page, this.saveRoutineButton);

    await expect(
      this.page.locator('#root > div > div.layout_outlet > div > div.routine-list-wrapper > div:nth-child(1)'),
    ).toBeVisible();
    return routineId;
  }
  async addNewRoutine() {
    await this.newRoutineButton.click();
    await this.routineName.fill('Test Routine');
    await this.routineDesciption.fill('This is a test routine with one exercise.');

    await this.addExerciseButton.click();
    await this.chooseExercise.fill('push');
    await this.page.getByRole('option', { name: 'Push Press', exact: true }).click();
    await this.saveButton.click();

    const routineId = await this.getRoutineId(this.page, this.saveRoutineButton);

    await expect(
      this.page.locator('#root > div > div.layout_outlet > div > div.routine-list-wrapper > div:nth-child(1)'),
    ).toBeVisible();
    return routineId;
  }
  async deleteRoutineWithRoutineOptions() {
    await this.routineOptions.click();
    await this.deleteRoutineButton.click();
    await this.deleteRoutineConfirmationButton.click();
    await expect(this.routineList).toHaveCount(0);
  }
  async goToRoutineDetails() {
    await this.routineItem.click();
  }
  async editRoutineWithRoutineOptions() {
    await this.routineOptions.click();
    await this.editRoutineButton.click();
  }
  async expectListRoutineToBeEmpty() {
    await expect(this.routineList).toHaveCount(0);
  }
  async expectRoutineNameToBeUpdated() {
    await expect(this.routineItemTitle).toHaveText(routineData.routineUpdatedName);
  }
  async goToEditRoutineForm() {
    await this.editRoutineButton.click();
  }
}
