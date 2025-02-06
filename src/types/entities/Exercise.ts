export interface ExerciseSimple {
  id: string;
  name: string;
}

export interface ExerciseDetails extends ExerciseSimple {
  force?: string;
  level?: string;
  mechanic?: string;
  equipment?: string;
  primaryMuscles?: Array<string>;
  secondaryMuscles?: Array<string>;
  description?: Array<string>;
  category?: string;
  images?: Array<string>;
}

export interface ExerciseDetailsPage {
  data: ExerciseDetails[];
  totalElements: number;
  totalPages: number;
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
