import { getMostUsedRoutines } from '@/api/workoutStats';
import BasicSpinner from '@/app/components/loaders/BasicSpinner';
import ErrorPage from '@/app/errorPage/ErrorPage';
import MostUsedRoutineCard from './mostUsedRoutineCard/MostUsedRoutineCard';
import { useQuery } from '@tanstack/react-query';
import './MostUsedRoutines.scss';
import { SimpleRoutine } from '@/types/entities/Routine';

const MostUsedRoutines = () => {
  
  const {
    data: routines,
    error: errorQuery,
    isLoading,
  } = useQuery<SimpleRoutine[]>({
    queryKey: ['most-used-routines'],
    queryFn: () => {
      return getMostUsedRoutines();
    },
  });

  if (isLoading) {
    return <BasicSpinner />;
  }
  if (errorQuery) {
    return <ErrorPage />;
  }

  if (!routines || routines.length === 0) {
    return null;
  }

  return (
    <div className='most-used-routines'>
      <h2 className='most-used-routines__title'>Quickstart</h2>
      <div className='most-used-routines__content'>
        {routines.map(
          (routine: SimpleRoutine) =>
            routine && <MostUsedRoutineCard routineId={routine.id} routineName={routine.name} key={routine.id} />,
        )}
      </div>
    </div>
  );
};

export default MostUsedRoutines;
