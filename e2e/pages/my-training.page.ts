import { Locator, Page } from '@playwright/test';

export class MyTrainingPage {
  title: Locator;
  selectView: Locator;
  workoutList: Locator;
  currentMonthButton: Locator;
  calendar: Locator;
  workoutInCalendar: Locator;

  constructor(private page: Page) {
    this.title = this.page.getByTestId('my-training-title');
    this.selectView = this.page.locator('select');
    this.workoutList = this.page.getByTestId('workout-list');
    this.currentMonthButton = this.page.getByTestId('current-month-button');
    this.calendar = this.page.getByTestId('my-training-calendar');
    this.workoutInCalendar = this.page.getByTestId('item-workout-container');
  }
}
