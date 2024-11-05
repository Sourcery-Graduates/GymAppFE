import api from '@/config/axios/config';
import { ExerciseDetails } from '@/types/entities/Exercise';

const exerciseSearchApi = '/api/workout/exercise';

export const fetchExerciseByName = async (exercisePrefix: string = ''): Promise<ExerciseDetails[]> => {
  const size = 10;
  const page = 0;

  const response = await api.get(exerciseSearchApi + `?page=${page}&size=${size}&prefix=${exercisePrefix}`);
  const exerciseDetails: ExerciseDetails[] = response.data.data;

  return exerciseDetails;
};
