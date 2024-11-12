// src/mocks/mockRoutineData.ts
// TODO: to be removed
import { RoutineWithExercises } from '@/types/entities/Routine';
import { v4 as uuidv4 } from 'uuid';

export const mockRoutineData: RoutineWithExercises = {
  routine: {
    userId: '1',
    id: '75bab785-42ac-45fe-b49a-a48460534350',
    name: 'Full Body Routine',
    description: 'A well-rounded routine targeting all major muscle groups.',
    likes: 42,
    userLikes: true,
    createdAt: new Date().toISOString(),
  },
  exercises: [
    {
      routineExerciseId: 'routine-exercise-1',
      exercise: {
        id: '5a83dc6e-a0d5-467d-8057-e025b84c13f7',
        name: 'Squat',
      },
      orderNumber: 1,
      defaultSets: 3,
      defaultReps: 12,
      defaultWeight: 100,
      defaultRestTime: 60,
      notes:
        'Keep your back straight and go slow, Keep your back straight and go slow, Keep your back straight and go slow, Keep your back straight and go slow, Keep your back straight and go slow, Keep your back straight and go slow, Keep your back straight and go slow, straight123 x Keep your back straight and go slow, Keep your back straight and go slow, Keep your back straight and go slow, Keep your back straight and go slow, Keep your back straight and go slow, Keep your back straight and go slow, Keep your back straight and go slow, straight567',
    },
    {
      routineExerciseId: 'routine-exercise-12',
      exercise: {
        id: '5231ad82-e69e-44cf-85a4-36db25c36aa6',
        name: 'Squat2',
      },
      orderNumber: 4,
      defaultSets: 3,
      defaultReps: 121,
      defaultWeight: 1001,
      defaultRestTime: 601,
      notes: '2Keep your back straight and go slow2',
    },
    {
      routineExerciseId: 'routine-exercise-2',
      exercise: {
        id: '5b42e834-e6d6-4e70-aed7-0b86cb85e6fd',
        name: 'Bench Press',
      },
      orderNumber: 2,
      defaultSets: 4,
      defaultReps: 8,
      defaultWeight: 80,
      defaultRestTime: 90,
      notes: 'Use a spotter for heavier sets',
    },
    {
      routineExerciseId: 'routine-exercise-3',
      exercise: {
        id: '85cdec1e-b64b-4068-9cd7-92f2876e08a9',
        name: 'Deadlift',
      },
      orderNumber: 3,
      defaultSets: 3,
      defaultReps: 10,
      defaultWeight: 120,
      defaultRestTime: 120,
      notes: 'Focus on form to prevent injury',
    },
  ],
};
