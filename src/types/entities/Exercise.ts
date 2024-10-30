export interface ExerciseSimple {
  id: string;
  name: string;
}

export interface ExerciseDetails extends ExerciseSimple {
  force: string | null;
  level: string | null;
  mechanic: string | null;
  equipment: string | null;
  primaryMuscles: Array<string> | null;
  secondaryMuscles: Array<string> | null;
  description: Array<string> | null;
  category: string | null;
  images: Array<string> | null;
}

export interface CreateRoutineExercise {
  exerciseId: string;
  orderNumber: number;
  defaultSets: number;
  defaultReps: number;
  defaultWeight: number;
  defaultRestTime: number;
  notes?: string;
}
