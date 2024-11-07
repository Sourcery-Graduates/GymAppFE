import api from '@/config/axios/config.ts';
import { Workout } from '../types/entities/Workout';

export const createWorkout = async (workout: Workout): Promise<Workout> => {
  const response = await api.post('api/workout', workout);
  return response.data;
};
