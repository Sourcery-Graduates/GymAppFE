import { RoutineExercise } from '@/types/entities/Routine';
import { useLocation } from 'react-router-dom';
import { Workout } from '@/types/entities/Workout';
import { mapToWorkoutExercise } from '@/types/mapper/exercise';
import dayjs from 'dayjs';
import WorkoutForm from '@/app/myTraining/workout/workoutForm/WorkoutForm';

const CreateWorkout = () => {
  const location = useLocation();
  const routineData = location.state?.routineData;
  const initialWorkout: Workout = {
    name: routineData.routine.name,
    date: dayjs(),
    comment: '',
    exercises: routineData.exercises.map((routineExercise: RoutineExercise) => mapToWorkoutExercise(routineExercise)),
  };

  return <WorkoutForm initialWorkout={initialWorkout} typeOfWorkout={'new_workout'} />;
};

export default CreateWorkout;
