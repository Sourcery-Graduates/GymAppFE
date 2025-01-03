import { CalendarWorkoutHashMap, CreateWorkout, ResponseWorkout } from '@/types/entities/Workout';
import api from '@/config/axios/config';
import { Dayjs } from 'dayjs';
import { QueryKey } from '@tanstack/react-query';

const workoutApi = '/api/workout/workout';

export enum WORKOUT_Endpoint {
  USER_WORKOUT_GRID = workoutApi + '/user',
  WORKOUT_GRID_DATE_RANGE = workoutApi + '/date',
  CREATE_WORKOUT = workoutApi,
  DELETE_WORKOUT = workoutApi + '/id',
  UPDATE_WORKOUT = workoutApi + '/id',
  GET_WORKOUT_BY_ID = workoutApi + '/id',
  COUNT_WORKOUT = workoutApi + '/count',
  TOTAL_WEIGHT = workoutApi + '/totalWeight',
}

export const getUserWorkoutGrid = async (): Promise<ResponseWorkout[]> => {
  const response = await api.get(WORKOUT_Endpoint.USER_WORKOUT_GRID);
  return response.data;
};

export const getUserWorkoutGridByDateRange = async (
  startDate: Dayjs,
  endDate: Dayjs,
): Promise<CalendarWorkoutHashMap> => {
  const params = new URLSearchParams();

  params.append('startDate', startDate.toISOString());
  params.append('endDate', endDate.toISOString());

  const endpointWithParams = `${WORKOUT_Endpoint.WORKOUT_GRID_DATE_RANGE}?${params.toString()}`;
  const response = await api.get(endpointWithParams);
  return response.data.workouts;
};

export const updateWorkout = async (workout: CreateWorkout): Promise<ResponseWorkout> => {
  const route = WORKOUT_Endpoint.UPDATE_WORKOUT.replace('id', workout?.id);
  workout.exercises?.forEach((exercise) => {
    exercise.id && (exercise.id = exercise.id.startsWith('temporary-id-') ? undefined : exercise.id);
    exercise.sets?.forEach((set) => {
      set.id && (set.id = set.id.startsWith('temporary-id-') ? undefined : set.id);
    });
  });
  const response = await api.put(route, workout);
  return response.data;
};

export const createWorkout = async (workout: CreateWorkout): Promise<ResponseWorkout> => {
  workout.exercises?.forEach((exercise) => {
    exercise.id && (exercise.id = exercise.id.startsWith('temporary-id-') ? undefined : exercise.id);
    exercise.sets?.forEach((set) => {
      set.id && (set.id = set.id.startsWith('temporary-id-') ? undefined : set.id);
    });
  });
  const response = await api.post(WORKOUT_Endpoint.CREATE_WORKOUT, workout);
  const responseWorkout = response.data;
  return responseWorkout;
};

export const deleteWorkout = async (workoutId: string): Promise<void> => {
  const route = WORKOUT_Endpoint.DELETE_WORKOUT.replace('id', workoutId);
  await api.delete(route);
};

export const getWorkoutById = async (workoutId: string): Promise<ResponseWorkout> => {
  const response = await api.get(WORKOUT_Endpoint.GET_WORKOUT_BY_ID.replace('id', workoutId));
  return response.data;
};

export const getWorkoutCount = async ({ queryKey }: { queryKey: QueryKey }): Promise<number> => {
  const [, minusMonth] = queryKey as [string, number];

  if (minusMonth) {
    const response = await api.get(`${WORKOUT_Endpoint.COUNT_WORKOUT}?minusMonth=${minusMonth}`);

    return response.data;
  }

  const response = await api.get(WORKOUT_Endpoint.COUNT_WORKOUT);
  return response.data;
};

export const getTotalWeight = async ({ queryKey }: { queryKey: QueryKey }): Promise<number> => {
  const [, minusMonth] = queryKey as [string, number];

  if (minusMonth) {
    const response = await api.get(`${WORKOUT_Endpoint.TOTAL_WEIGHT}?minusMonth=${minusMonth}`);

    return response.data;
  }
  const response = await api.get(WORKOUT_Endpoint.TOTAL_WEIGHT);
  return response.data;
};
