import { Routine, RoutineWithExercises } from '../types/entities/Routine';
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

export const fetchRoutineWithExercises = async (routineId: string): Promise<RoutineWithExercises> => {
  const response = await api.get(`${Routine_Endpoint.ROUTINE_EXERCISE}?routineId=${routineId}`);

  return response.data;
};

export const createRoutine = async (data: { name: string; description?: string }): Promise<Routine> => {
  const response = await api.post(`${Routine_Endpoint.ROUTINE}`, data);

  return response.data;
};

// todo: update with exercises, for now only the name and description is updated
export const updateRoutine = async (data: {
  name: string;
  description?: string;
  routineId?: string;
}): Promise<Routine> => {
  const response = await api.put(`${Routine_Endpoint.ROUTINE}/${data.routineId}`, data);

  return response.data;
};

export const deleteRoutine = async (routineId: string): Promise<void> => {
  await api.delete(`${Routine_Endpoint.ROUTINE}/${routineId}`);
};
