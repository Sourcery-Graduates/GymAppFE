import { APIRequestContext } from '@playwright/test';
import { DataTestManager } from '../test-utils/dataTestManager';
import { faker } from '@faker-js/faker';
import { RoutineHelper } from '../helpers/routineHelper';
import { RoutinesPage } from '../pages/routines.page';

export class RoutineFactory {
  private name: string;
  private description: string;
  private registerCleanup: boolean;

  constructor(
    private apiContext: APIRequestContext,
    private dataTestManager: DataTestManager,
  ) {
    this.name = faker.music.songName();
    this.description = faker.lorem.sentence();
    this.registerCleanup = true;
  }

  static init(apiContext: APIRequestContext, dataTestManager: DataTestManager) {
    return new RoutineFactory(apiContext, dataTestManager);
  }

  getName(): string {
    return this.name;
  }
  getDescription(): string {
    return this.description;
  }

  withName(name: string) {
    this.name = name;
    return this;
  }
  withDescription(description: string) {
    this.description = description;
    return this;
  }
  withoutCleanup() {
    this.registerCleanup = false;
    return this;
  }

  async create() {
    const helper = new RoutineHelper(this.apiContext);
    const routine = await helper.createRoutine(this.name, this.description);
    if (this.registerCleanup) {
      await helper.registerRoutineCleanup(routine.id, this.dataTestManager);
    }
    return routine;
  }

  async createWithExercises(exerciseCount: number) {
    const helper = new RoutineHelper(this.apiContext);
    const routine = await helper.createRoutineWithExercises(this.name, this.description, exerciseCount);
    if (this.registerCleanup) {
      await helper.registerRoutineCleanup(routine.routine.id, this.dataTestManager);
    }
    return routine;
  }

  async createViaUI(routinesPage: RoutinesPage, withExercises: boolean) {
    const routineId = withExercises
      ? await routinesPage.addNewRoutine(this)
      : await routinesPage.addNewRoutineWithNoExercise(this);

    if (this.registerCleanup) {
      const helper = new RoutineHelper(this.apiContext);
      await helper.registerRoutineCleanup(routineId, this.dataTestManager);
    }
    return routineId;
  }

  static async generateRandomNameAndDescription() {
    const name = faker.music.songName();
    const description = faker.lorem.sentence();
    return { name, description };
  }
}
