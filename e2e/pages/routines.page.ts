import { expect, Locator, Page } from '@playwright/test';
import { routineData } from '../test-data/routine.data';
import { BasePage } from './base.page';
import { RoutineCreatePage } from './routine/routine-create.page';
import { RoutineCardComponent } from '../components/routineCard.component';
import { RoutineUpdatePage } from './routine/routine-update.page';

export class RoutinesPage extends BasePage {
  myRoutines: Locator;
  publicRoutines: Locator;
  newRoutineButton: Locator;

  routineList: Locator;

  editRoutineButton: Locator;
  deleteRoutineButton: Locator;
  deleteRoutineConfirmationButton: Locator;

  constructor(protected page: Page) {
    super(page, '/routines');
    this.myRoutines = this.page.getByTestId('my-routines');
    this.publicRoutines = this.page.getByTestId('public-routines');
    this.newRoutineButton = this.page.getByTestId('new-routine-button');

    this.routineList = this.page.getByTestId('routine-list');

    this.editRoutineButton = this.page.getByText('Edit Routine');
    this.deleteRoutineButton = this.page.getByText('Delete Routine');
    this.deleteRoutineConfirmationButton = this.page.getByTestId('delete-workout-confirmation-button');
  }

  async expectHeadingToBeVisible() {
    await expect(this.myRoutines).toHaveText('My Routines');
    await expect(this.publicRoutines).toHaveText('Public Routines');
  }

  async clickNewRoutineButton(): Promise<RoutineCreatePage> {
    await this.newRoutineButton.click();
    return new RoutineCreatePage(this.page);
  }

  async addNewRoutineWithNoExercise() {
    const createRoutinePage = await this.clickNewRoutineButton();
    await createRoutinePage.name.fill(routineData.emptyRoutineName);
    await createRoutinePage.description.fill(routineData.noExerciseDescription);

    const routineId = await createRoutinePage.saveAndGetRoutineId();

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

    const routineId = await createRoutinePage.saveAndGetRoutineId();

    return routineId;
  }
  async expectRoutineToBeVisible(routineName: string) {
    await expect(this.routineItemTitle).toHaveText(routineName);
  }

  async editRoutineWithRoutineOptions(routine): Promise<RoutineUpdatePage> {
    const routineCard = await RoutineCardComponent.getByName(this.page, routine.name);
    await routineCard.optionsButton.click();
    await this.editRoutineButton.click();
    return new RoutineUpdatePage(this.page, routine.id);
  }

  async deleteRoutineWithRoutineOptions(routineName: string) {
    const routineCard = await RoutineCardComponent.getByName(this.page, routineName);
    await routineCard.optionsButton.click();
    await this.deleteRoutineButton.click();
    await this.deleteRoutineConfirmationButton.click();
  }
  async goToRoutineDetailsPage(routine) {
    const routineCard = await RoutineCardComponent.getByName(this.page, routine.name);
    const routineDetailsPage = await routineCard.click(this.page, routine.id);
    return routineDetailsPage;
  }
  async expectListRoutineToBeEmpty() {
    await expect(this.routineList).toBeEmpty();
  }
  async expectRoutineNameToBeUpdated(routineCard) {
    await expect(routineCard.name).toHaveText(routineData.routineUpdatedName);
  }
}
