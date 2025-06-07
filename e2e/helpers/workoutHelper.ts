import { APIRequestContext, expect } from '@playwright/test';
import { RoutineHelper } from './routineHelper';
import { ExerciseHelper } from './exerciseHelper';
import { RoutineExercise } from '../test-data/exercises.data';

export class WorkoutHelper {
  apiContext: APIRequestContext;
  routineHelper: RoutineHelper;
  routineExercises: ExerciseHelper;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
    this.routineHelper = new RoutineHelper(this.apiContext);
    this.routineExercises = new ExerciseHelper(this.apiContext);
  }

  async createWorkout(routineName: string, routineDesc: string, exercises: RoutineExercise[], comment?: string) {
    const todayISO = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).toISOString();

    // First step is to create routine and get routineId from backend response
    const routine = await this.routineHelper.createRoutine(routineName, routineDesc);
    expect(routine.id).toBeDefined();

    // The next step is to associate exercises with the routine
    await this.routineExercises.addExercisesToRoutine(routine.id, exercises);

    // The final step is to create a workout based on the previously added routine and exercises
    const response = await this.apiContext.post('/api/workout/workout', {
      data: {
        name: `${routineName} workout`,
        routineId: routine.id,
        date: todayISO,
        comment: comment,
        exercises: exercises, // TODO: we need a mapper to add sets
      },
    });
    if (!response.ok()) throw new Error(`Failed to create workout: ${response.status()}`);
    return await response.json();
  }

  async deleteWorkout(workoutId: string, routineId: string) {
    this.routineHelper.deleteRoutine(routineId);
    const response = await this.apiContext.delete(`/api/workout/workout/${workoutId}`);
    if (!response.ok()) throw new Error(`Failed to delete workout: ${response.status()}`);
  }
}
