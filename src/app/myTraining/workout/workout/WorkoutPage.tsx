import WorkoutForm from '@/app/myTraining/workout/workoutForm/WorkoutForm';
import { useLocation } from 'react-router-dom';
import { CreateWorkout } from '@/types/entities/Workout';
import dayjs from 'dayjs';
import './WorkoutPage.scss';

const WorkoutPage = () => {
  const location = useLocation();
  const workoutData: CreateWorkout = location.state?.workoutData;

  // idk whats goin on here, location.state is cutting it's functions
  const initialWorkout = workoutData;
  initialWorkout.date = dayjs(workoutData.date);

  return (
    <div className='workout-form-container'>
      <WorkoutForm initialWorkout={workoutData} typeOfWorkout={'existing_workout'} />
    </div>
  );
};

export default WorkoutPage;
