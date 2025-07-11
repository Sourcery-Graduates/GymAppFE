import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { RoutineUpdatePage } from './routine-update.page';
import { WorkoutFormPage } from '../workout/workout-form.page';
import { RoutinesPage } from '../routines.page';

export class RoutineDetailsPage extends BasePage {
  editRoutineButton: Locator;
  deleteRoutineButton: Locator;
  deleteRoutineConfirmationButton: Locator;
  startWorkoutButton: Locator;

  constructor(
    protected page: Page,
    private routineId: string,
  ) {
    super(page, `/routines/routine-details/${routineId}`);
    this.editRoutineButton = this.page.getByTestId('routine-details-edit-routine-button');
    this.deleteRoutineButton = this.page.getByTestId('routine-details-delete-routine-button');
    this.deleteRoutineConfirmationButton = this.page.getByTestId('delete-workout-confirmation-button');
    this.startWorkoutButton = this.page.getByTestId('start-workout-button');
  }

  async editRoutine(routineId: string) {
    await this.editRoutineButton.click();
    return new RoutineUpdatePage(this.page, routineId);
  }

  async deleteRoutine(): Promise<RoutinesPage> {
    await this.deleteRoutineButton.click();
    await this.deleteRoutineConfirmationButton.click();
    return new RoutinesPage(this.page);
  }

  async startWorkout(): Promise<WorkoutFormPage> {
    await this.startWorkoutButton.click();
    return new WorkoutFormPage(this.page);
  }
}
