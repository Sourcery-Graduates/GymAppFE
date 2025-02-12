import { useEffect } from 'react';
import RoutineForm from '../RoutineForm';
import { useRoutineExercises } from '@/app/common/context/RoutineExercisesContext';

const RoutineCreate = () => {
  const { setExercises } = useRoutineExercises();

  useEffect(() => {
    setExercises([]);
  }, [setExercises]);

  return <RoutineForm />;
};

export default RoutineCreate;
