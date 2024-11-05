export interface Routine {
    id?: string;
    name: string;
    description?: string;
    likes?: number;
    userLikes?: boolean;
    createdAt: string;
}

export interface SimpleExercise {
    id: string;
    name: string;
}

export interface RoutineExercise {
    routineExerciseId: string;
    exercise: SimpleExercise;
    orderNumber: number;
    defaultsSets: number;
    defaultReps: number;
    defaultWeight: number;
    defaultRestTime: number;
    notes?: string;
}

export interface RoutineWithExercises {
    routine: Routine;
    exercises: RoutineExercise[]
}

export interface PagedRoutine {
    routines: Routine[];
    totalPages: number;
    totalElements: number;
}