import Pagination from '@mui/material/Pagination';
import './PublicRoutines.scss';
import List from '@mui/material/List';
import { useQuery } from '@tanstack/react-query';
import { fetchAllPublicRoutines } from '@/api/routineApi';
import BasicSpinner from '@/app/components/loaders/BasicSpinner';
import RoutineListItem from './routineListItem/RoutineListItem';

const PublicRoutines = () => {
  const {
    data: data,
    isLoading,
    error,
  } = useQuery({
    queryFn: fetchAllPublicRoutines,
    queryKey: ['routines'],
  });

  console.log(data);
  if (isLoading) {
    return <BasicSpinner />;
  }
  if (error) {
    //TODO: add app alerts
  }
  return (
    <div>
      <List sx={{ width: '100%' }}>
        {data && data.routines.map((routine) => <RoutineListItem key={routine.id} routine={routine} />)}
      </List>
      <Pagination count={20} shape='rounded' />
    </div>
  );
};

export default PublicRoutines;
