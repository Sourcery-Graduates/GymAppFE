import { workoutListMock } from '@/types/entities/mocks/WorkoutMock';
import { Workout } from '@/types/entities/Workout';

const workoutApi = '/api/workout/workout';

export enum WORKOUT_Endpoint {
  USER_WORKOUT_GRID = workoutApi + '/user',
}

export const getUserWorkoutGrid = async (): Promise<Workout[]> => {
  //TODO MOCK
  return workoutListMock;
};
