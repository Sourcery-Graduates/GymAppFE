import { CreateRoutineExercise } from '@/types/entities/Exercise';
import { RoutineExercise } from '@/types/entities/Routine';
import {
  CreateWorkout,
  CreateWorkoutExercise,
  ResponseWorkout,
  ResponseWorkoutExercise,
} from '@/types/entities/Workout';

export const mapRoutineExerciseToCreateWorkoutExercise = (routineExercise: RoutineExercise): CreateWorkoutExercise => {
  const workoutExercise: CreateWorkoutExercise = {
    id: undefined,
    exerciseId: routineExercise.exercise.id,
    exerciseName: routineExercise.exercise.name,
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

export const mapToRoutineExercise = (
  createRoutineExercise: CreateRoutineExercise,
  name: string,
  orderNumber: number,
): RoutineExercise => {
  const routineExercise: RoutineExercise = {
    routineExerciseId: undefined,
    exercise: {
      id: createRoutineExercise.exerciseId,
      name: name,
    },
    orderNumber: orderNumber,
    defaultSets: createRoutineExercise.defaultSets,
    defaultReps: createRoutineExercise.defaultReps,
    defaultWeight: createRoutineExercise.defaultWeight,
    defaultRestTime: createRoutineExercise.defaultRestTime,
    notes: createRoutineExercise.notes,
  };
  return routineExercise;
};

export const mapToCreateWorkout = (responseWorkout: ResponseWorkout) => {
  const createWorkout: CreateWorkout = {
    id: responseWorkout.id,
    routineId: responseWorkout.routineId,
    name: responseWorkout.name,
    // mapping it to dayjs here produces errors
    date: responseWorkout.date,
    comment: responseWorkout.comment,
    exercises: mapResponseToCreateWorkoutExercise(responseWorkout.exercises),
  };

  console.log('dayjs w mapperze', createWorkout.date);

  return createWorkout;
};

export const mapResponseToCreateWorkoutExercise = (responseWorkoutExercises: ResponseWorkoutExercise[]) => {
  const createWorkoutExercises = responseWorkoutExercises.map((exercise) => ({
    id: exercise.id,
    exerciseId: exercise.exercise.id,
    exerciseName: exercise.exercise.name,
    orderNumber: exercise.orderNumber,
    notes: exercise.notes,
    sets: exercise.sets,
  }));

  return createWorkoutExercises;
};
