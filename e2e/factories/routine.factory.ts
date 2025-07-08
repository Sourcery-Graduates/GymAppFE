import { APIRequestContext } from '@playwright/test';
import { DataTestManager } from '../test-utils/dataTestManager';
import { faker } from '@faker-js/faker';
import { RoutineHelper } from '../helpers/routineHelper';

export class RoutineFactory {
  private name: string;
  private description: string;
  private registerCleanup: boolean;

  constructor(
    private apiContex: APIRequestContext,
    private dataTestManager: DataTestManager,
  ) {
    this.name = faker.music.songName();
    this.description = faker.lorem.sentence();
    this.registerCleanup = true;
  }

  static init(apiContex: APIRequestContext, dataTestManager: DataTestManager) {
    return new RoutineFactory(apiContex, dataTestManager);
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
  withRandomNameAndDescription() {
    this.name = faker.music.songName();
    this.description = faker.lorem.sentence();
    return this;
  }
  withoutCleanup() {
    this.registerCleanup = false;
    return this;
  }

  async create() {
    const helper = new RoutineHelper(this.apiContex);
    const routine = await helper.createRoutine(this.name, this.description);
    if (this.registerCleanup) {
      await helper.registerRoutineCleanup(routine.id, this.dataTestManager);
    }
    return routine;
  }

  async createWithExercises(exerciseCount: number) {
    const helper = new RoutineHelper(this.apiContex);
    const routine = await helper.createRoutineWithExercises(this.name, this.description, exerciseCount);
    if (this.registerCleanup) {
      await helper.registerRoutineCleanup(routine.routine.id, this.dataTestManager);
    }
    return routine;
  }

  static async generateRandomNameAndDescription() {
    const name = faker.music.songName();
    const description = faker.lorem.sentence();
    return { name, description };
  }
}
