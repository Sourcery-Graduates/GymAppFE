import { expect, Locator, Page } from '@playwright/test';

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

  async goto() {
    await this.page.goto('/my-training');
  }
  async reloadPage() {
    await this.page.reload({ waitUntil: 'load' });
  }
  async expectHeadingToBeVisible() {
    await expect(this.title).toHaveText('MY TRAININGS');
  }
  async expectDefaultViewIsList() {
    await expect(this.selectView).toHaveValue('List');
  }
  async expectListIsEmpty() {
    await expect(this.workoutList).toBeEmpty();
  }
  async expectListContainsWorkouts() {
    await expect(this.workoutList).not.toBeEmpty();
  }
  async switchViewTo(view: string) {
    await this.selectView.selectOption(view);
  }
  async expectCalendarIsVisible() {
    await expect(this.selectView).toHaveValue('Calendar');
    await expect(this.currentMonthButton).toBeVisible();
    await expect(this.calendar).toBeVisible();
  }
  async expectCalendarIsEmpty() {
    const workouts = await this.workoutInCalendar.all();
    for (const workout of workouts) {
      await expect(workout).toBeEmpty();
    }
  }
  async expectCalendarContainsWorkout() {
    const workoutCount = await this.workoutInCalendar.count();
    expect(workoutCount).toBeGreaterThan(0);
  }
}
