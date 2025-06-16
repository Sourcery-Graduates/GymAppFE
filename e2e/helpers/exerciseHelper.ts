import { APIRequestContext } from '@playwright/test';
import { RoutineExercise } from '../test-data/exercises.data';

export class ExerciseHelper {
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

  async getExerciseByName(name: string): Promise<RoutineExercise[]> {
    const response = await this.apiContext.get(`/api/workout/exercise?page=0&size=10&prefix=${name}`);
    if (!response.ok()) throw new Error(`Failed to get exercises: ${response.status()}`);
    const data = await response.json();
    const exercises = data.data;
    const found = exercises.find((exercise) => exercise.name === name);
    if (!found) {
      throw new Error(`Exercise with ${name} not found`);
    }
    return [
      {
        exerciseId: found.id,
        routineExerciseId: found.id,
        defaultSets: 3,
        defaultReps: 12,
        defaultWeight: 40,
        defaultRestTime: 90,
        notes: '',
        restTimeUnit: 'seconds',
        weightUnit: 'kg',
        exercise: {
          id: found.id,
          name: found.name,
        },
        orderNumber: 1,
      },
    ];
  }

  async getGivenNumberOfExercises(limit: number): Promise<RoutineExercise[]> {
    const response = await this.apiContext.get(`/api/workout/exercise?page=0&size=${limit}`);
    if (!response.ok()) throw new Error(`Failed to get exercises: ${response.status()}`);
    const data = await response.json();
    const exercises = data.data;

    return exercises.map((exercise, index) => ({
      exerciseId: exercise.id,
      routineExerciseId: exercise.id,
      defaultSets: 3,
      defaultReps: 12,
      defaultWeight: 40,
      defaultRestTime: 90,
      notes: '',
      restTimeUnit: 'seconds',
      weightUnit: 'kg',
      exercise: {
        id: exercise.id,
        name: exercise.name,
      },
      orderNumber: index + 1,
    }));
  }
}
