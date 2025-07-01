import { Page } from '@playwright/test';
import { RoutineFormBasePage } from './routine-form-base.page';

export class RoutineCreatePage extends RoutineFormBasePage {
  url = '/routines/routine-create';

  constructor(protected page: Page) {
    super(page);
  }
}
