import { CreateRoutineExercise } from '@/types/entities/Exercise';
import { PagedRoutine, Routine, RoutineExercise, RoutineWithExercises } from '../types/entities/Routine';
import api from '@/config/axios/config.ts';

export enum Routine_Endpoint {
  USER = 'api/workout/routine/user',
  ROUTINE = 'api/workout/routine',
  ROUTINE_EXERCISE = 'api/workout/routine/exercise',
}

export const fetchUserRoutines = async (): Promise<Routine[]> => {
  const response = await api.get(Routine_Endpoint.USER);

  return response.data;
};

export const fetchAllPublicRoutines = async (
  page: number,
  size: number,
  searchValue: string,
): Promise<PagedRoutine> => {
  let response;
  if (searchValue) {
    response = await api.get(
      `${Routine_Endpoint.ROUTINE}?page=${page}&size=${size}&sort=name%2CASC&name=${searchValue}`,
    );
  } else {
    response = await api.get(`${Routine_Endpoint.ROUTINE}?page=${page}&size=${size}&sort=name%2CASC`);
  }

  return response.data;
};

export const fetchRoutineWithExercises = async (routineId: string): Promise<RoutineWithExercises> => {
  const response = await api.get(`${Routine_Endpoint.ROUTINE_EXERCISE}?routineId=${routineId}`);

  return response.data;
};

export const createRoutine = async (data: { name: string; description?: string }): Promise<Routine> => {
  const response = await api.post(`${Routine_Endpoint.ROUTINE}`, data);

  return response.data;
};

export const updateRoutine = async (data: {
  name: string;
  description?: string;
  routineId?: string;
}): Promise<Routine> => {
  const response = await api.put(`${Routine_Endpoint.ROUTINE}/${data.routineId}`, data);

  return response.data;
};

export const updateRoutineExercises = async (
  routineId: string,
  data: RoutineExercise[],
): Promise<RoutineWithExercises> => {
  const exerciseList: CreateRoutineExercise[] = data.map((item, index) => ({
    ...item,
    exerciseId: item.exercise.id,
    orderNumber: index + 1,
  }));

  const response = await api.put(`${Routine_Endpoint.ROUTINE_EXERCISE}?routineId=${routineId}`, exerciseList);
  return response.data;
};

export const deleteRoutine = async (routineId: string): Promise<void> => {
  await api.delete(`${Routine_Endpoint.ROUTINE}/${routineId}`);
};
