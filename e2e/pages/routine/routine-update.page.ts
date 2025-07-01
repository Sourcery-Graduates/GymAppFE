import { Page } from '@playwright/test';
import { RoutineFormBasePage } from './routine-form-base.page';

export class RoutineUpdatePage extends RoutineFormBasePage {
  url: string;

  constructor(
    protected page: Page,
    private routineId: string,
  ) {
    super(page);
    this.url = `/routines/routine-update/${routineId}`;
  }
}
