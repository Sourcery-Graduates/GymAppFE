export interface Routine {
  id: string;
  name: string;
  description?: string;
  likesCount: number;
  isLikedByCurrentUser: boolean;
  createdAt: string;
  userId: string;
}

export interface SimpleExercise {
  id: string;
  name: string;
}

export interface RoutineExercise {
  routineExerciseId?: string;
  exercise: SimpleExercise;
  orderNumber: number;
  defaultSets: number;
  defaultReps: number;
  defaultWeight: number;
  defaultRestTime: number;
  notes?: string;
}

export interface RoutineWithExercises {
  routine: Routine;
  exercises: RoutineExercise[];
}

export interface PagedRoutine {
  data: Routine[];
  totalPages: number;
  totalElements: number;
}
