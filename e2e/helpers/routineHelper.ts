import { APIRequestContext } from '@playwright/test';
import { ExerciseHelper } from './exerciseHelper';
import { DataTestManager } from './dataTestManager';

export class RoutineHelper {
  apiContext: APIRequestContext;
  dataTestManager: DataTestManager;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
    this.dataTestManager = new DataTestManager();
  }

  async createRoutine(
    name: string,
    description: string = '',
    dataTestManager: DataTestManager,
    registerCleanup: boolean,
  ) {
    const response = await this.apiContext.post('/api/workout/routine', {
      data: {
        name: name,
        description: description,
      },
    });
    if (!response.ok()) throw new Error(`Failed to create routine: ${response.status()}`);
    const routine = await response.json();

    if (dataTestManager && registerCleanup) {
      await this.registerRoutineCleanup(routine.id, dataTestManager);
    }
    return routine;
  }

  async createRoutineWithExercises(
    name: string,
    description: string = '',
    exercisesNumber: number,
    dataTestManager: DataTestManager,
    registerCleanup: boolean,
  ) {
    const exerciseHelper = new ExerciseHelper(this.apiContext);
    const exercises = await exerciseHelper.getGivenNumberOfExercises(exercisesNumber);
    const routine = await this.createRoutine(name, description, dataTestManager, registerCleanup);
    await exerciseHelper.addExercisesToRoutine(routine.id, exercises);
    return { routine, exercises };
  }

  async deleteRoutine(routineId: string): Promise<void> {
    const response = await this.apiContext.delete(`/api/workout/routine/${routineId}`);
    if (!response.ok()) throw new Error(`Failed to delete routine: ${response.status()}`);
  }
  async registerRoutineCleanup(routineId: string, dataTestManager: DataTestManager) {
    dataTestManager.registerCleanup(() => this.deleteRoutine(routineId));
  }
}
