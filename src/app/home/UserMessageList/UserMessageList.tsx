import BasicSpinner from '@/app/components/loaders/BasicSpinner';
import ErrorPage from '@/app/errorPage/ErrorPage';
import UserMessageCard from './userMessageCard/UserMessageCard';
import { useQuery } from '@tanstack/react-query';
import './UserMessageList.scss';
import { getWorkoutStats } from '@/api/workout';
import { WorkoutStats } from '@/types/entities/Workout';

const UserMessageList = () => {
  const {
    data: workoutStats,
    error: errorQuery,
    isLoading,
  } = useQuery<WorkoutStats[]>({
    queryKey: ['workout-stats'],
    queryFn: getWorkoutStats,
  });

  if (isLoading) {
    return <BasicSpinner />;
  }

  if (errorQuery) {
    <ErrorPage />;
  }
  if (!workoutStats || workoutStats.length === 0) {
    return 'Hello, welcome to your dashboard!';
  }

  console.log(workoutStats[0].content);
  return (
    <div className='user-message-list'>
      {workoutStats.map((workoutStat) => {
        return <UserMessageCard key={workoutStat.id} data={workoutStat.content} isLoading={isLoading} />;
      })}
    </div>
  );
};

export default UserMessageList;
