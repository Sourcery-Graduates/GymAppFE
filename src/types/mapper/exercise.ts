import { CreateRoutineExercise } from '@/types/entities/Exercise';
import { RoutineExercise } from '@/types/entities/Routine';
import { WorkoutExercise } from '@/types/entities/Workout';

export const mapToWorkoutExercise = (routineExercise: RoutineExercise): WorkoutExercise => {
  const workoutExercise: WorkoutExercise = {
    id: routineExercise.exercise.id,
    exercise: routineExercise.exercise,
    orderNumber: routineExercise.orderNumber,
    notes: routineExercise.notes || '',
    sets: Array.from({ length: routineExercise.defaultSets || 1 }, (_, index) => ({
      id: 'testID',
      setNumber: index + 1,
      reps: routineExercise.defaultReps,
      weight: routineExercise.defaultWeight,
      restTime: routineExercise.defaultRestTime,
      comment: '',
    })),
  };
  return workoutExercise;
};

export const mapToRoutineExercise = (createRoutineExercise: CreateRoutineExercise, name: string): RoutineExercise => {
  const routineExercise: RoutineExercise = {
    routineExerciseId: undefined,
    exercise: {
      id: createRoutineExercise.exerciseId,
      name: name,
    },
    orderNumber: createRoutineExercise.orderNumber,
    defaultSets: createRoutineExercise.defaultSets,
    defaultReps: createRoutineExercise.defaultReps,
    defaultWeight: createRoutineExercise.defaultWeight,
    defaultRestTime: createRoutineExercise.defaultRestTime,
    notes: createRoutineExercise.notes,
  };
  return routineExercise;
};
