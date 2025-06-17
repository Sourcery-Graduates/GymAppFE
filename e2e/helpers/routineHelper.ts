import { APIRequestContext } from '@playwright/test';

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

    async deleteRoutine(routineId: string) {
    const response = await this.apiContext.delete(`/api/workout/routine/${routineId}`);
    if (!response.ok()) throw new Error(`Failed to delete routine: ${response.status()}`);
  }
}
