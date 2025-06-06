import { APIRequestContext } from '@playwright/test';
import { RoutineExercise } from '../test-data/exercises.data';

export class RoutineExerciseHelper {
  apiContext: APIRequestContext;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  async addExercisesToRoutine(routineId: string, exercises: RoutineExercise[]) {
    const response = await this.apiContext.put(`/api/workout/routine/exercise?routineId=${routineId}`, {
      data: exercises,
    });
    if (!response.ok()) throw new Error(`Failed to add exercises to routine: ${response.status()}`);
    return await response.json();
  }
}
