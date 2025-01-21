import { SimpleExercise } from '@/types/entities/Routine';
import { Dayjs } from 'dayjs';

export interface CreateWorkout {
  id?: string;
  routineId: string;
  name: string;
  date: Dayjs;
  comment: string;
  exercises: CreateWorkoutExercise[];
}

export interface ResponseWorkout {
  id: string;
  routineId: string;
  name: string;
  date: Date;
  comment: string;
  exercises: ResponseWorkoutExercise[];
}

export type WorkoutFormType = Omit<CreateWorkout, 'routineId' | 'date'> & {
  date: Dayjs;
};

export interface CreateWorkoutExercise {
  id?: string;
  exerciseId: string;
  exerciseName: string;
  orderNumber: number;
  notes: string;
  sets: WorkoutExerciseSet[];
}

export interface ResponseWorkoutExercise {
  id: string;
  exercise: SimpleExercise;
  orderNumber: number;
  notes: string;
  sets: WorkoutExerciseSet[];
}

export interface WorkoutExerciseSet {
  id?: string;
  setNumber: number;
  reps: number;
  weight: number;
  restTime: number;
  comment: string;
}
export type CalendarWorkoutHashMap = Record<string, ResponseWorkout[]>;

export interface WorkoutStats {
  id: string;
  type: string;
  content: string;
}

export interface MuscleSet {
  primaryMuscles: string[];
  numberOfSets: number;
}
