import { APIRequestContext, expect } from '@playwright/test';
import { RoutineHelper } from './routineHelper';
import { RoutineExerciseHelper } from './routineExerciseHelper';
import { RoutineExercise } from '../test-data/exercises.data';

export class WorkoutHelper {
  apiContext: APIRequestContext;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  async createWorkout(routineName: string, routineDesc: string, exercises: RoutineExercise[], comment?: string) {
    const todayISO = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).toISOString();
    const routineHelper = new RoutineHelper(this.apiContext);
    const routineExercises = new RoutineExerciseHelper(this.apiContext);

    // First step is to create routine and get routineId from backend response
    const routine = await routineHelper.createRoutine(routineName, routineDesc);
    expect(routine.id).toBeDefined();

    // The next step is to associate exercises with the routine
    await routineExercises.addExercisesToRoutine(routine.id, exercises);

    // The final step is to create a workout based on the previously added routine and exercises
    const response = await this.apiContext.post('/api/workout/workout', {
      data: {
        name: `${routineName} workout`,
        routineId: routine.id,
        date: todayISO,
        comment: comment,
        exercises: exercises,
      },
    });
    if (!response.ok()) throw new Error(`Failed to create workout: ${response.status()}`);
    return await response.json();
  }
}
