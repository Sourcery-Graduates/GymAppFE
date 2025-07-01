import { APIRequestContext } from '@playwright/test';
import { ExerciseHelper } from './exerciseHelper';

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

  async createRoutineWithExercises(routineName: string, routineDesc: string, exercisesNumber: number) {
    const exerciseHelper = new ExerciseHelper(this.apiContext);
    const exercises = await exerciseHelper.getGivenNumberOfExercises(exercisesNumber);
    const routine = await this.createRoutine(routineName, routineDesc);
    await exerciseHelper.addExercisesToRoutine(routine.id, exercises);
    return { routine, exercises };
  }

  async deleteRoutine(routineId: string): Promise<void> {
    const response = await this.apiContext.delete(`/api/workout/routine/${routineId}`);
    if (!response.ok()) throw new Error(`Failed to delete routine: ${response.status()}`);
  }
}
