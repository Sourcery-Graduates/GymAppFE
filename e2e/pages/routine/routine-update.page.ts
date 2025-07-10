import { Locator, Page } from '@playwright/test';
import { RoutineFormBasePage } from './routine-form-base.page';

export class RoutineUpdatePage extends RoutineFormBasePage {

  deleteRoutineButton: Locator;
  deleteRoutineConfirmationButton: Locator;
  
  constructor(
    protected page: Page,
    private routineId: string,
  ) {
    super(page, `/routines/routine-update/${routineId}`);
    this.deleteRoutineButton = this.page.getByText('Delete Routine');
    this.deleteRoutineConfirmationButton = this.page.getByTestId('delete-workout-confirmation-button');
  }
}
