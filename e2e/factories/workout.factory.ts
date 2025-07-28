import { APIRequestContext } from '@playwright/test';
import { DataTestManager } from '../test-utils/dataTestManager';
import { faker } from '@faker-js/faker';
import { WorkoutHelper } from '../helpers/workoutHelper';
import { RoutineExercise } from '../models/exercises.data';
import { WorkoutFormPage } from '../pages/workout/workout-form.page';

export class WorkoutFactory {
  private name: string;
  private comment: string;
  private registerCleanup: boolean;

  constructor(
    private apiContext: APIRequestContext,
    private dataTestManager: DataTestManager,
  ) {
    this.name = faker.music.songName();
    this.comment = faker.lorem.sentence();
    this.registerCleanup = true;
  }

  static init(apiContext: APIRequestContext, dataTestManager: DataTestManager) {
    return new WorkoutFactory(apiContext, dataTestManager);
  }

  getName(): string {
    return this.name;
  }
  getComment(): string {
    return this.comment;
  }

  withName(name: string) {
    this.name = name;
    return this;
  }
  withComment(comment: string) {
    this.comment = comment;
    return this;
  }
  withoutCleanup() {
    this.registerCleanup = false;
    return this;
  }

  async create(routineId: string) {
    const helper = new WorkoutHelper(this.apiContext);
    const workout = await helper.createWorkout(this.name, routineId, [], this.comment);
    if (this.registerCleanup) {
      await helper.registerWorkoutCleanup(workout.id, this.dataTestManager);
    }
    return workout;
  }

  async createWithExercises(routineId: string, exercise: RoutineExercise[]) {
    const helper = new WorkoutHelper(this.apiContext);
    const workout = await helper.createWorkout(this.name, routineId, exercise, this.comment);
    if (this.registerCleanup) {
      await helper.registerWorkoutCleanup(workout.id, this.dataTestManager);
    }
    return workout;
  }

  async createViaUI(workoutFormPage: WorkoutFormPage) {
    const workoutId = await workoutFormPage.createWorkoutAndGetWorkoutId();

    if (this.registerCleanup) {
      const helper = new WorkoutHelper(this.apiContext);
      await helper.registerWorkoutCleanup(workoutId, this.dataTestManager);
    }
    return workoutId;
  }

}
