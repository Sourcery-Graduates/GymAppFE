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
    await createRoutinePage.name.fill(routineData.emptyRoutineName); //TODO: static names will be fixed with GYM-264
    await createRoutinePage.description.fill(routineData.noExerciseDescription);

    const routineId = await createRoutinePage.saveAndGetRoutineId();

    return routineId;
  }

  async addNewRoutine() {
    const createRoutinePage = await this.clickNewRoutineButton();
    await createRoutinePage.name.fill(routineData.routineName); //TODO: static names will be fixed with GYM-264
    await createRoutinePage.description.fill(routineData.oneExerciseDescription);

    const exerciseModal = await createRoutinePage.addExercise();
    await exerciseModal.expectHeadingToBeVisible();
    await exerciseModal.chooseExercise();
    await exerciseModal.saveButton.click();

    const routineId = await createRoutinePage.saveAndGetRoutineId();

    return routineId;
  }
  async expectRoutineToBeVisible(routineId: string) {
    const routineCard = await RoutineCardComponent.getByRoutineId(this.page, routineId);
    await expect(routineCard.root).toBeVisible();
  }

  async editRoutineWithRoutineOptions(routineId: string): Promise<RoutineUpdatePage> {
    const routineCard = await RoutineCardComponent.getByRoutineId(this.page, routineId);
    await routineCard.optionsButton.click();
    await this.editRoutineButton.click();
    return new RoutineUpdatePage(this.page, routineId);
  }

  async deleteRoutineWithRoutineOptions(routineId: string) {
    const routineCard = await RoutineCardComponent.getByRoutineId(this.page, routineId);
    await routineCard.optionsButton.click();
    await this.deleteRoutineButton.click();
    await this.deleteRoutineConfirmationButton.click();
  }
  async goToRoutineDetailsPage(routineId: string) {
    const routineCard = await RoutineCardComponent.getByRoutineId(this.page, routineId);
    const routineDetailsPage = await routineCard.click(this.page, routineId);
    return routineDetailsPage;
  }
  async expectListRoutineToBeEmpty() {
    await expect(this.routineList).toBeEmpty();
  }
  async expectRoutineNameToBeUpdated(routineId: string) {
    const updatedRoutineCard = await RoutineCardComponent.getByRoutineId(this.page, routineId);
    await expect(updatedRoutineCard.name).toHaveText(routineData.routineUpdatedName); //TODO: static names will be fixed with GYM-264
  }
}
