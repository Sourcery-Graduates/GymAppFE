import api from '@/config/axios/config';
import { ExerciseDetails, ExerciseDetailsPage } from '@/types/entities/Exercise';

export enum EXERCISE_Endpoint {
  EXERCISE_BY_PREFIX = 'api/workout/exercise',
  EXERCISE_BY_PREFIX_AND_PRIMARY_MUSCLE = 'api/workout/exercise/primary-muscle',
}

export const fetchExerciseByName = async (exercisePrefix: string = ''): Promise<ExerciseDetails[]> => {
  const size = 10;
  const page = 0;

  const response = await api.get(
    EXERCISE_Endpoint.EXERCISE_BY_PREFIX + `?page=${page}&size=${size}&prefix=${exercisePrefix}`,
  );
  const exerciseDetails: ExerciseDetails[] = response.data.data;

  return exerciseDetails;
};

export const fetchExercisePagedByPrimaryMuscleAndPrefix = async (
  exercisePrefix: string = '',
  primaryMuscle: string = '',
  page: number = 0,
  size: number = 10,
): Promise<ExerciseDetailsPage> => {
  const response = await api.get(
    EXERCISE_Endpoint.EXERCISE_BY_PREFIX_AND_PRIMARY_MUSCLE +
      `?page=${page}&size=${size}&prefix=${exercisePrefix}&primaryMuscle=${primaryMuscle}`,
  );
  const exerciseDetails: ExerciseDetailsPage = response.data;

  return exerciseDetails;
};
