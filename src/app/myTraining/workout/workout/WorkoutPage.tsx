import WorkoutForm from '@/app/myTraining/workout/workoutForm/WorkoutForm';
import { useLocation } from 'react-router-dom';
import { Workout } from '@/types/entities/Workout';
import dayjs from 'dayjs';

const WorkoutPage = () => {
  const location = useLocation();
  const workoutData: Workout = location.state?.workoutData;
  workoutData.date = dayjs(workoutData.date);

  return (
    <div style={{ width: '100%' }}>
      <WorkoutForm initialWorkout={workoutData} typeOfWorkout={'existing_workout'} />
    </div>
  );
};

export default WorkoutPage;
