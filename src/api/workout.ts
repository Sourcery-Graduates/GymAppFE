import { CreateWorkout, ResponseWorkout } from '@/types/entities/Workout';
import api from '@/config/axios/config';

const workoutApi = '/api/workout/workout';

export enum WORKOUT_Endpoint {
  USER_WORKOUT_GRID = workoutApi + '/user',
  CREATE_WORKOUT = workoutApi,
  DELETE_WORKOUT = workoutApi + '/id',
  UPDATE_WORKOUT = workoutApi + '/id',
}

export const getUserWorkoutGrid = async (): Promise<ResponseWorkout[]> => {
  const response = await api.get(WORKOUT_Endpoint.USER_WORKOUT_GRID);
  console.log(response);
  return response.data;
};

export const updateWorkout = async (workout: CreateWorkout): Promise<ResponseWorkout> => {
  const route = WORKOUT_Endpoint.UPDATE_WORKOUT.replace('id', workout?.id);
  workout.exercises?.forEach(exercise => {
    exercise.id && (exercise.id = exercise.id.startsWith("temporary-id-") ? undefined : exercise.id)
    exercise.sets?.forEach(set => {
      set.id && (set.id = set.id.startsWith("temporary-id-") ? undefined : set.id);
    })
  })
  console.log('updatedWorkout ', workout);
  const response = await api.put(route, workout);
  return response.data;
};

export const createWorkout = async (workout: CreateWorkout): Promise<ResponseWorkout> => {
  const response = await api.post(WORKOUT_Endpoint.CREATE_WORKOUT, workout);
  const responseWorkout = response.data;
  return responseWorkout;
};

export const deleteWorkout = async (workoutId: string): Promise<void> => {
  const route = WORKOUT_Endpoint.DELETE_WORKOUT.replace('id', workoutId);
  await api.delete(route);
};
