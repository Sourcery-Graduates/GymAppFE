import { expect, Locator, Page } from '@playwright/test';

export class RoutinesPage {
  myRoutines: Locator;
  publicRoutines: Locator;

  newRoutineButton: Locator;
  routineName: Locator;
  routineDesciption: Locator;
  addExerciseButton: Locator;
  saveRoutineButton: Locator;

  chooseExercise: Locator;
  saveButton: Locator;

  constructor(private page: Page) {
    this.myRoutines = this.page.getByTestId('my-routines');
    this.publicRoutines = this.page.getByTestId('public-routines');

    this.newRoutineButton = this.page.getByTestId('new-routine-button');
    this.routineName = this.page.locator('#\\:r7\\:');
    this.routineDesciption = this.page.locator('#\\:r9\\:');
    this.addExerciseButton = this.page.getByTestId('add-exercise-button');
    this.saveRoutineButton = this.page.getByTestId('save-routine-button');

    this.chooseExercise = this.page.locator('#\\:rd\\:');
    this.saveButton = this.page.getByTestId('save-button');
  }

  async goto() {
    await this.page.goto('/routines');
  }
  async expectHeadingToBeVisible() {
    await expect(this.myRoutines).toHaveText('My Routines');
    await expect(this.publicRoutines).toHaveText('Public Routines');
  }
  async addNewRoutineWithNoExercise() {
    await this.newRoutineButton.click();
    await this.routineName.fill('Empty Test Routine');
    await this.routineDesciption.fill('This is a test routine without any exercises.');

    const [response] = await Promise.all([
    this.page.waitForResponse(response => response.url().includes('/api/workout/routine') && response.request().method() === 'POST'),
    this.saveRoutineButton.click(),
  ]);
    console.log(await response.json());
    
    await expect(
      this.page.locator('#root > div > div.layout_outlet > div > div.routine-list-wrapper > div:nth-child(1)'),
    ).toBeVisible();
  }
  async addNewRoutine() {
    await this.newRoutineButton.click();
    await this.routineName.fill('Test Routine');
    await this.routineDesciption.fill('This is a test routine with one exercise.');
    await this.addExerciseButton.click();
    await this.chooseExercise.fill('push');
    await this.page.getByRole('option', { name: 'Push Press', exact: true }).click();
    await this.saveButton.click();
    await this.saveRoutineButton.click();
    await expect(
      this.page.locator('#root > div > div.layout_outlet > div > div.routine-list-wrapper > div:nth-child(1)'),
    ).toBeVisible();
  }
}
