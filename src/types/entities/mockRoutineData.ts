// src/mocks/mockRoutineData.ts
// TODO: to be removed
import { RoutineWithExercises } from '@/types/entities/Routine';

export const mockRoutineData: RoutineWithExercises = {
  routine: {
    userId: '1',
    id: 'routine-1',
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
        id: 'exercise-1',
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
        id: 'exercise-12',
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
        id: 'exercise-2',
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
        id: 'exercise-3',
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
