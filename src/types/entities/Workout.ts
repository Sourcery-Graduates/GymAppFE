import { SimpleExercise } from '@/types/entities/Routine';

export interface Workout {
  id?: string;
  name: string;
  date: Date;
  comment: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutExercise {
  id: string;
  exercise: SimpleExercise;
  orderNumber: number;
  notes: string;
  sets: WorkoutExerciseSet[];
}

export interface WorkoutExerciseSet {
  id: string;
  setNumber: number;
  reps: number;
  weight: number;
  restTime: number;
  comment: string;
}
