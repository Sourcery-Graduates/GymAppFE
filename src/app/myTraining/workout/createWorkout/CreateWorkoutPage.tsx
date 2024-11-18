import { RoutineExercise } from '@/types/entities/Routine';
import { useLocation } from 'react-router-dom';
import { mapRoutineExerciseToCreateWorkoutExercise } from '@/types/mapper/exercise';
import WorkoutForm from '@/app/myTraining/workout/workoutForm/WorkoutForm';
import { CreateWorkout } from '@/types/entities/Workout';
import dayjs from 'dayjs';

const CreateWorkoutPage = () => {
  const location = useLocation();
  const routineData = location.state?.routineData;
  const initialWorkout: CreateWorkout = {
    name: routineData.routine.name,
    routineId: routineData.routine.id,
    date: dayjs().toDate(),
    comment: '',
    exercises: routineData.exercises.map((routineExercise: RoutineExercise) =>
      mapRoutineExerciseToCreateWorkoutExercise(routineExercise),
    ),
  };

  return <WorkoutForm initialWorkout={initialWorkout} typeOfWorkout={'new_workout'} />;
};

export default CreateWorkoutPage;
