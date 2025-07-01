import { Page } from '@playwright/test';
import { RoutineFormBasePage } from './routine-form-base.page';

export class RoutineUpdatePage extends RoutineFormBasePage {
  constructor(
    protected page: Page,
    private routineId: string,
  ) {
    super(page, `/routines/routine-update/${routineId}`);
  }
}
