// src/mocks/mockRoutineData.ts
// TODO: to be removed
import { RoutineWithExercises } from '@/types/entities/Routine';

export const mockRoutineData: RoutineWithExercises = {
  routine: {
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
      defaultsSets: 3,
      defaultReps: 12,
      defaultWeight: 100,
      defaultRestTime: 60,
      notes: 'Keep your back straight and go slow',
    },
    {
      routineExerciseId: 'routine-exercise-2',
      exercise: {
        id: 'exercise-2',
        name: 'Bench Press',
      },
      orderNumber: 2,
      defaultsSets: 4,
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
      defaultsSets: 3,
      defaultReps: 10,
      defaultWeight: 120,
      defaultRestTime: 120,
      notes: 'Focus on form to prevent injury',
    },
  ],
};
