import { Page } from '@playwright/test';
import { RoutineFormBasePage } from './routine-form-base.page';

export class RoutineCreatePage extends RoutineFormBasePage {
  constructor(protected page: Page) {
    super(page, '/routines/routine-create');
  }
}
