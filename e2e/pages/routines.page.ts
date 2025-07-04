import { expect, Locator, Page } from '@playwright/test';
import { routineData } from '../test-data/routine.data';
import { BasePage } from './base.page';
import { RoutineCreatePage } from './routine/routine-create.page';

export class RoutinesPage extends BasePage {
  myRoutines: Locator;
  publicRoutines: Locator;

  newRoutineButton: Locator;
  routineName: Locator;
  routineDescription: Locator;
  addExerciseButton: Locator;
  saveRoutineButton: Locator;

  routineOptions: Locator;
  editRoutineButton: Locator;
  deleteRoutineButton: Locator;
  deleteRoutineConfirmationButton: Locator;
  routineList: Locator;
  routineItem: Locator;
  routineItemTitle: Locator;

  constructor(protected page: Page) {
    super(page, '/routines');
    this.myRoutines = this.page.getByTestId('my-routines');
    this.publicRoutines = this.page.getByTestId('public-routines');

    this.newRoutineButton = this.page.getByTestId('new-routine-button');
    this.routineName = this.page.locator('#\\:r7\\:');
    this.routineDescription = this.page.locator('#\\:r9\\:');
    this.addExerciseButton = this.page.getByTestId('add-exercise-button');
    this.saveRoutineButton = this.page.getByTestId('save-routine-button');

    this.routineOptions = this.page.getByRole('button', { name: 'Routine options' });
    this.editRoutineButton = this.page.getByText('Edit Routine');
    this.deleteRoutineButton = this.page.getByText('Delete Routine');
    this.deleteRoutineConfirmationButton = this.page.getByTestId('delete-workout-confirmation-button');

    this.routineList = this.page.getByTestId('routine-list');
    this.routineItem = this.page.getByTestId('routine-item');
    this.routineItemTitle = this.page.getByTestId('routine-item-title');
  }

  async expectHeadingToBeVisible() {
    await expect(this.myRoutines).toHaveText('My Routines');
    await expect(this.publicRoutines).toHaveText('Public Routines');
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

  async clickNewRoutineButton(): Promise<RoutineCreatePage> {
    await this.newRoutineButton.click();
    return new RoutineCreatePage(this.page);
  }

  async addNewRoutineWithNoExercise() {
    const createRoutinePage = await this.clickNewRoutineButton();
    await createRoutinePage.name.fill(routineData.emptyRoutineName);
    await createRoutinePage.description.fill(routineData.noExerciseDescription);

    const routineId = await this.saveAndGetRoutineId();

    return routineId;
  }

  async addNewRoutine() {
    const createRoutinePage = await this.clickNewRoutineButton();
    await createRoutinePage.name.fill(routineData.routineName);
    await createRoutinePage.description.fill(routineData.oneExerciseDescription);

    const exerciseModal = await createRoutinePage.addExercise();
    await exerciseModal.expectHeadingToBeVisible();
    await exerciseModal.chooseExercise();
    await exerciseModal.saveButton.click();

    const routineId = await this.saveAndGetRoutineId();

    return routineId;
  }
  async expectRoutineToBeVisible(routineName: string) {
    await expect(this.routineItemTitle).toHaveText(routineName);
  }
  async deleteRoutineWithRoutineOptions() {
    await this.routineOptions.click();
    await this.deleteRoutineButton.click();
    await this.deleteRoutineConfirmationButton.click();
  }
  async goToRoutineDetails() {
    await this.routineItem.click();
  }
  async editRoutineWithRoutineOptions() {
    await this.routineOptions.click();
    await this.editRoutineButton.click();
  }
  async expectListRoutineToBeEmpty() {
    await expect(this.routineList).toBeEmpty();
  }
  async expectRoutineNameToBeUpdated() {
    await expect(this.routineItemTitle).toHaveText(routineData.routineUpdatedName);
  }
  async goToEditRoutineForm() {
    await this.editRoutineButton.click();
  }
}
