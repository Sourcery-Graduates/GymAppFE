import { v4 as uuidv4 } from 'uuid';
import { workoutListMock } from '@/types/entities/mocks/WorkoutMock';
import { Workout } from '@/types/entities/Workout';

const workoutApi = '/api/workout/workout';

export enum WORKOUT_Endpoint {
  USER_WORKOUT_GRID = workoutApi + '/user',
  CREATE_WORKOUT = workoutApi,
}

export const getUserWorkoutGrid = async (): Promise<Workout[]> => {
  //TODO MOCK
  return workoutListMock;
};

export const createWorkout = async (workout: Workout): Promise<Workout> => {
  //TO DO MOCK
  const responseWorkout = workout;
  responseWorkout.id = uuidv4();
  responseWorkout.date = responseWorkout.date.toDate();
  return responseWorkout;
};

export const deleteWorkout = async (workoutId: string): Promise<Workout> => {
  //TO DO MOCK
  return {} as Workout;
};
