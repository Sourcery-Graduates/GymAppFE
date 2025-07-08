import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { RoutineFactory } from '../factories/routine.factory';
import { DataTestManager } from '../test-utils/dataTestManager';
import { RoutineHelper } from '../helpers/routineHelper';

export class RoutinesPage extends BasePage {
  myRoutines: Locator;
  publicRoutines: Locator;

  newRoutineButton: Locator;
  routineName: Locator;
  routineDescription: Locator;
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

  constructor(protected page: Page) {
    super(page, '/routines');
    this.myRoutines = this.page.getByTestId('my-routines');
    this.publicRoutines = this.page.getByTestId('public-routines');

    this.newRoutineButton = this.page.getByTestId('new-routine-button');
    this.routineName = this.page.locator('#\\:r7\\:');
    this.routineDescription = this.page.locator('#\\:r9\\:');
    this.addExerciseButton = this.page.getByTestId('add-exercise-button');
    this.saveRoutineButton = this.page.getByTestId('save-routine-button');

    this.chooseExercise = this.page.locator('#\\:rd\\:');
    this.saveButton = this.page.getByTestId('save-button');

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
  async addNewRoutineWithNoExercise(
    routine: RoutineFactory,
    routineHelper: RoutineHelper,
    dataTestManager: DataTestManager,
  ) {
    await this.newRoutineButton.click();
    await this.routineName.fill(routine.getName());
    await this.routineDescription.fill(routine.getDescription());

    const routineId = await this.saveAndGetRoutineId();
    // Register cleanup for routine to be removed in afterEach
    await routineHelper.registerRoutineCleanup(routineId, dataTestManager);

    return routineId;
  }
  async addNewRoutine(routine: RoutineFactory, routineHelper: RoutineHelper, dataTestManager: DataTestManager) {
    await this.newRoutineButton.click();
    await this.routineName.fill(routine.getName());
    await this.routineDescription.fill(routine.getDescription());

    await this.addExerciseButton.click();
    await this.chooseExercise.fill('push');
    await this.page.getByRole('option', { name: 'Push Press', exact: true }).click();
    await this.saveButton.click();

    const routineId = await this.saveAndGetRoutineId();
    // Register cleanup for routine to be removed in afterEach
    await routineHelper.registerRoutineCleanup(routineId, dataTestManager);

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
  async expectRoutineNameToBeUpdated(name: string) {
    await expect(this.routineItemTitle).toHaveText(name);
  }
  async goToEditRoutineForm() {
    await this.editRoutineButton.click();
  }
}
