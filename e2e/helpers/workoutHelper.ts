import { APIRequestContext } from '@playwright/test';

export class WorkoutHelper {
  apiContext: APIRequestContext;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  async createWorkout(name: string, routineId: string, exercises: any[], comment?: string) {
    const todayISO = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).toISOString();

    const response = await this.apiContext.post('/api/workout/workout', {
      data: {
        name: name,
        routineId: routineId,
        date: todayISO,
        comment: comment,
        exercises: exercises,
      },
    });
    if (!response.ok()) throw new Error(`Failed to create workout: ${response.status()}`);
    return await response.json();
  }
}
