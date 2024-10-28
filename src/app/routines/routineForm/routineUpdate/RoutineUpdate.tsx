import { fetchRoutineDetails } from '@/app/api/routineApi';
import BasicSpinner from '@/app/components/loaders/BasicSpinner';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import RoutineForm from '../RoutineForm';
import './RoutineUpdate.scss';

const RoutineUpdate = () => {
  const { routineId } = useParams();

  const { data: routine, isLoading } = useQuery({
    queryFn: () => fetchRoutineDetails(routineId!),
    queryKey: ['routines', routineId],
  });

  if (isLoading) {
    return (
      <div className='routine-update-container'>
        <BasicSpinner />
      </div>
    );
  }
  return <RoutineForm routine={routine} />;
};

export default RoutineUpdate;
