type Exercise = {
  id: string;
  name: string;
};

export type RoutineExercise = {
  exerciseId: string;
  defaultSets: number;
  defaultReps: number;
  defaultWeight: number;
  defaultRestTime: number;
  notes: string;
  restTimeUnit: string;
  weightUnit: string;
  routineExerciseId: string;
  exercise: Exercise;
  orderNumber: number;
};
