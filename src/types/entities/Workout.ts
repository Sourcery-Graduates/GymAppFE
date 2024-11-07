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
  exerciseId: string;
  orderNumber: number;
  notes?: string;
  sets: WorkoutExerciseSet[];
}

export interface WorkoutExerciseSet {
  setNumber: number;
  reps?: number;
  weight?: number;
  restTime?: number;
  comment?: string;
}
