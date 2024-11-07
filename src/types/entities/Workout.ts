import { SimpleExercise } from '@/types/entities/Routine.ts';

export interface Workout {
  id?: string;
  name: string;
  date: Date;
  comment?: string;
  exercises: WorkoutExercise[];
  routineId?: string;
  basedOnWorkoutId?: string;
}

export interface WorkoutExercise {
  workoutExerciseId: string | null;
  exercise: SimpleExercise;
  orderNumber: number;
  notes?: string;
  sets: WorkoutExerciseSet[];
}

export interface WorkoutExerciseSet {
  workoutExerciseSetId: string | null;
  setNumber: number;
  reps?: number;
  weight?: number;
  restTime?: number;
  comment?: string;
}
