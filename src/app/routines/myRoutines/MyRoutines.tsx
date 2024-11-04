import BasicSpinner from '@/app/components/loaders/BasicSpinner';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { fetchUserRoutines } from '@/api/routineApi.ts';
import RoutineCard from '../routineCard/RoutineCard';

import './MyRoutines.scss';

const MyRoutines: () => ReactNode = () => {
  const {
    data: routines,
    isLoading,
    error,
  } = useQuery({
    queryFn: fetchUserRoutines,
    queryKey: ['routines'],
  });

  if (isLoading) {
    return <BasicSpinner />;
  }
  if (error) {
    //TODO: add app alerts
  }

  //TODO: chan
  return (
    <div className='routine-list-wrapper'>
      {routines &&
        routines.map((routine) => (
          <RoutineCard
            id={routine.id!}
            key={routine.id}
            name={routine.name}
            description={routine.description}
            likes={routine.likes || 0}
            userLikes={routine.userLikes || false}
            createdAt={routine.createdAt}
          />
        ))}
    </div>
  );
};

export default MyRoutines;
