import { SimpleExercise } from '@/types/entities/Routine';
import { Dayjs } from 'dayjs';

export interface Workout {
  id?: string;
  name: string;
  date: Dayjs;
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
