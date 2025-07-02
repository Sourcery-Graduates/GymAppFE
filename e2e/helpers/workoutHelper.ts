import { APIRequestContext, expect } from '@playwright/test';
import { RoutineHelper } from './routineHelper';
import { ExerciseHelper } from './exerciseHelper';
import { RoutineExercise } from '../test-data/exercises.data';
import { DataTestManager } from './dataTestManager';

export class WorkoutHelper {
  apiContext: APIRequestContext;
  routineHelper: RoutineHelper;
  routineExercises: ExerciseHelper;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
    this.routineHelper = new RoutineHelper(this.apiContext);
    this.routineExercises = new ExerciseHelper(this.apiContext);
  }

  async createWorkout(
    name: string,
    routineId: string,
    exercises: RoutineExercise[],
    comment: string,
    dataTestManager: DataTestManager,
    registerCleanup: boolean,
  ) {
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

    if (dataTestManager && registerCleanup) {
      await this.registerWorkoutCleanup(workout.id, dataTestManager);
    }
    return workout;
  }

  async createWorkoutAndRoutine(
    routineName: string,
    routineDesc: string,
    exercises: RoutineExercise[],
    comment: string,
    dataTestManager: DataTestManager,
    registerCleanup: boolean,
  ) {
    // First step is to create routine and get routineId from backend response
    const routine = await this.routineHelper.createRoutine(routineName, routineDesc, dataTestManager, registerCleanup);
    expect(routine.id).toBeDefined();

    // The next step is to associate exercises with the routine
    await this.routineExercises.addExercisesToRoutine(routine.id, exercises);

    // The final step is to create a workout based on the previously added routine and exercises
    const workout = await this.createWorkout(
      routineName,
      routine.id,
      exercises,
      comment,
      dataTestManager,
      registerCleanup,
    );
    return workout;
  }

  async deleteWorkout(workoutId: string): Promise<void> {
    const response = await this.apiContext.delete(`/api/workout/workout/${workoutId}`);
    if (!response.ok()) throw new Error(`Failed to delete workout: ${response.status()}`);
  }
  async deleteWorkoutAndRoutine(workoutId: string, routineId: string): Promise<void> {
    await this.routineHelper.deleteRoutine(routineId);
    await this.deleteWorkout(workoutId);
  }
  async registerWorkoutCleanup(workoutId: string, dataTestManager: DataTestManager) {
    dataTestManager.registerCleanup(() => this.deleteWorkout(workoutId));
  }
}
