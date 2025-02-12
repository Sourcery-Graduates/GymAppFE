import { fetchRoutineWithExercises } from '@/api/routineApi';
import BasicSpinner from '@/app/components/loaders/BasicSpinner';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import RoutineForm from '../RoutineForm';

import './RoutineUpdate.scss';
import { useEffect } from 'react';
import { useRoutineExercises } from '@/app/common/context/RoutineExercisesContext';

const RoutineUpdate = () => {
  const { routineId } = useParams();
  const { setExercises } = useRoutineExercises();

  const { data: data, isLoading } = useQuery({
    queryFn: () => fetchRoutineWithExercises(routineId!),
    queryKey: ['routines', routineId],
  });

  const { data: exerciseList } = useQuery({
    queryFn: () => fetchRoutineWithExercises(routineId!),
    queryKey: ['exercises', routineId],
  });

  useEffect(() => {
    if (exerciseList && exerciseList.exercises) {
      setExercises(exerciseList.exercises);
    }
  }, [exerciseList, setExercises]);

  if (isLoading) {
    return (
      <div className='routine-update-container'>
        <BasicSpinner />
      </div>
    );
  }
  return <RoutineForm routine={data?.routine} />;
};

export default RoutineUpdate;
