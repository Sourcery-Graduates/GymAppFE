import api from '@/config/axios/config';
import { SimpleRoutine } from '@/types/entities/Routine';
import { MuscleSet, WorkoutStats } from '@/types/entities/Workout';

const workoutStatsApi = '/api/workout/workout-stats';

export enum WORKOUT_Endpoint {
  WORKOUT_STATS = workoutStatsApi,
  MOST_USED_ROUTINES = workoutStatsApi + '/most-used',
  MUSCLE_SETS = workoutStatsApi + '/muscle-sets',
}

export const getWorkoutStats = async (): Promise<WorkoutStats[]> => {
  const response = await api.get(`${WORKOUT_Endpoint.WORKOUT_STATS}`);

  return response.data;
};

export const getMostUsedRoutines = async (): Promise<SimpleRoutine[]> => {
  const response = await api.get(`${WORKOUT_Endpoint.MOST_USED_ROUTINES}`);

  return response.data;
};

export const getTotalMuscleSetsPerWeek = async (): Promise<MuscleSet[]> => {
  const response = await api.get(`${WORKOUT_Endpoint.MUSCLE_SETS}`);

  return response.data;
};
