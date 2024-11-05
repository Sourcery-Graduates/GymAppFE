import { ExerciseDetails, mockExercises } from '@/types/entities/Exercise';

export const fetchExerciseByName = async (exercisePrefix: string = ''): Promise<ExerciseDetails[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  if (exercisePrefix == '') return mockExercises;

  const exerciseDetails: ExerciseDetails[] = mockExercises.filter((exercise) =>
    exercise.name.startsWith(exercisePrefix),
  );

  return exerciseDetails;
};
