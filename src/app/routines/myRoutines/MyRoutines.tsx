import BasicSpinner from '@/app/components/loaders/BasicSpinner';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { fetchRoutines } from '../../../api/routineApi';
import RoutineCard from '../routineCard/RoutineCard';

import './MyRoutines.scss';

const MyRoutines: () => ReactNode = () => {
  const { data: routines, isLoading } = useQuery({
    queryFn: () => fetchRoutines(),
    queryKey: ['routines'],
  });

  if (isLoading) {
    return <BasicSpinner />;
  }

  return (
    <div className='routine-list-wrapper'>
      {routines?.map((routine) => (
        <RoutineCard
          id={routine.id}
          key={routine.id}
          name={routine.name}
          description={routine.description}
          likes={routine.likes}
          userLikes={routine.userLikes}
        />
      ))}
    </div>
  );
};

export default MyRoutines;
