import { getUserWorkoutGrid } from '@/api/workout';
import './MyTraining.scss';
import { useQuery } from '@tanstack/react-query';
import TrainingCard from '@/app/myTraining/trainingCard/TrainingCard';

const MyTraining = () => {
  const queryKey = 'user-workout-grid';
  const { data: workoutGrid, isLoading, error } = useQuery({ queryKey: [queryKey], queryFn: getUserWorkoutGrid });

  return (
    <div className='my-training'>
      <div className='title'> MY TRAININGS</div>
      <div className='workout-container'>
        {workoutGrid?.map((workout) => {
          return <TrainingCard key={workout.id} workout={workout} />;
        })}
      </div>
    </div>
  );
};

export default MyTraining;
