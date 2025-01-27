import BasicSpinner from '@/app/components/loaders/BasicSpinner';
import ErrorPage from '@/app/errorPage/ErrorPage';
import { useQuery } from '@tanstack/react-query';
import './UserMessageList.scss';
import { getWorkoutStats } from '@/api/workoutStats';
import { WorkoutStats } from '@/types/entities/Workout';
import { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import UserMessageCard from './userMessageCard/UserMessageCard';

const UserMessageList = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const {
    data: workoutStats,
    error: errorQuery,
    isLoading,
  } = useQuery<WorkoutStats[]>({
    queryKey: ['workout-stats'],
    queryFn: getWorkoutStats,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return <BasicSpinner />;
  }

  if (errorQuery) {
    <ErrorPage />;
  }

  if (!workoutStats || workoutStats.length === 0) {
    return null;
  }

  if (isMobile) {
    return (
      <div className='user-message-list'>
        <Carousel animation='slide' navButtonsAlwaysInvisible >
          {workoutStats.map((workoutStat) => {
            return <UserMessageCard key={workoutStat.id} data={workoutStat.content} isLoading={isLoading} />;
          })}
        </Carousel>
      </div>
    );
  }

  if (!isMobile) {
    return (
      <div className='user-message-list'>
        {workoutStats.map((workoutStat) => {
          return <UserMessageCard key={workoutStat.id} data={workoutStat.content} isLoading={isLoading} />;
        })}
      </div>
    );
  }
};

export default UserMessageList;
