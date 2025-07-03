import { APIRequestContext } from '@playwright/test';
import { ExerciseHelper } from './exerciseHelper';
import { DataTestManager } from '../test-utils/dataTestManager';

export class RoutineHelper {
  apiContext: APIRequestContext;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  async createRoutine(name: string, description: string = '') {
    const response = await this.apiContext.post('/api/workout/routine', {
      data: {
        name: name,
        description: description,
      },
    });
    if (!response.ok()) throw new Error(`Failed to create routine: ${response.status()}`);
    return await response.json();
  }

  async createRoutineAndRegisterCleanup(name: string, description: string = '', dataTestManager: DataTestManager) {
    const routine = await this.createRoutine(name, description);
    await this.registerRoutineCleanup(routine.id, dataTestManager);
    return routine;
  }

  async createRoutineWithExercises(name: string, description: string = '', exercisesNumber: number) {
    const exerciseHelper = new ExerciseHelper(this.apiContext);
    const exercises = await exerciseHelper.getGivenNumberOfExercises(exercisesNumber);
    const routine = await this.createRoutine(name, description);
    await exerciseHelper.addExercisesToRoutine(routine.id, exercises);
    return { routine, exercises };
  }

  async createRoutineWithExercisesAndRegisterCleanup(
    name: string,
    description: string = '',
    exercisesNumber: number,
    dataTestManager: DataTestManager,
  ) {
    const exerciseHelper = new ExerciseHelper(this.apiContext);
    const exercises = await exerciseHelper.getGivenNumberOfExercises(exercisesNumber);
    const routine = await this.createRoutineAndRegisterCleanup(name, description, dataTestManager);
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
