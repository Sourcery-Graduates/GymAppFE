import WorkoutForm from '@/app/pages/myTraining/workout/workoutForm/WorkoutForm';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateWorkout } from '@/types/entities/Workout';
import './WorkoutPage.scss';
import { useEffect, useState } from 'react';
import BasicSpinner from '@/app/components/loaders/BasicSpinner';
import { getWorkoutById } from '@/api/workout';
import { mapToCreateWorkout } from '@/types/mapper/exercise';
import { AppRoutes } from '@/types/routes';

const WorkoutPage = () => {
  const { workoutId } = useParams<{ workoutId: string }>();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<CreateWorkout | null>(null);

  useEffect(() => {
    if (workoutId !== undefined) {
      getWorkoutById(workoutId)
        .then((responseWorkout) => {
          setWorkout(mapToCreateWorkout(responseWorkout));
        })
        .catch();
    } else {
      navigate(AppRoutes.MY_TRAINING);
    }
  }, [workoutId, navigate]);

  if (workout === null) {
    return <BasicSpinner />;
  }

  return (
    <div className='workout-form-container'>
      <WorkoutForm initialWorkout={workout} typeOfWorkout={'existing_workout'} />
    </div>
  );
};

export default WorkoutPage;
