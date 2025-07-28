import { APIRequestContext } from '@playwright/test';
import { DataTestManager } from '../test-utils/dataTestManager';
import { RoutineExercise } from '../models/exercises.data';

export class WorkoutHelper {
  apiContext: APIRequestContext;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  async createWorkout(name: string, routineId: string, exercises: RoutineExercise[], comment: string) {
    const todayISO = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).toISOString();

    // The step is to create a workout based on the previously added routine and exercises
    const workoutExercises = exercises.map((exercise) => ({
      exerciseId: exercise.exerciseId,
      exerciseName: exercise.exercise.name,
      orderNumber: exercise.orderNumber,
      notes: exercise.notes,
      sets: Array.from({ length: exercise.defaultSets }, (_, index) => ({
        setNumber: index + 1,
        reps: exercise.defaultReps,
        weight: exercise.defaultWeight,
        restTime: exercise.defaultRestTime,
        comment: '',
      })),
    }));

    const response = await this.apiContext.post('/api/workout/workout', {
      data: {
        name: `${name} workout`,
        routineId: routineId,
        date: todayISO,
        comment: comment,
        exercises: workoutExercises,
      },
    });
    if (!response.ok()) throw new Error(`Failed to create workout: ${response.status()}`);
    const workout = await response.json();

    return workout;
  }

  async deleteWorkout(workoutId: string): Promise<void> {
    const response = await this.apiContext.delete(`/api/workout/workout/${workoutId}`);
    if (!response.ok()) throw new Error(`Failed to delete workout: ${response.status()}`);
  }
  async registerWorkoutCleanup(workoutId: string, dataTestManager: DataTestManager) {
    dataTestManager.registerCleanup(() => this.deleteWorkout(workoutId));
  }
}
