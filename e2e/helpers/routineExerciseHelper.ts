import { APIRequestContext } from '@playwright/test';

export class RoutineExerciseHelper {
  apiContext: APIRequestContext;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  async addExercisesToRoutine(routineId: string, exercises: any[]) {
    const response = await this.apiContext.put(`/api/workout/routine/exercise?routineId=${routineId}`, {
      data: exercises,
    });
    if (!response.ok()) throw new Error(`Failed to add exercises to routine: ${response.status()}`);
    return await response.json();
  }
}
