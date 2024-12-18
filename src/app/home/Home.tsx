import { useQuery } from '@tanstack/react-query';
import useAuth from '../common/hooks/useAuth';
import { getWorkoutCount } from '@/api/workout';
import BasicSpinner from '../components/loaders/BasicSpinner';
import ErrorPage from '../errorPage/ErrorPage';
import './Home.scss';

const Home = () => {
  const { username } = useAuth();

  const {
    data: number,
    error: errorQuery,
    isLoading,
  } = useQuery<number>({
    queryKey: ['workout-count'],
    queryFn: getWorkoutCount,
    retry: false,
  });

  if (isLoading) {
    return <BasicSpinner />;
  }

  if (errorQuery) {
    <ErrorPage />;
  }

  return (
    <>
      <div className='home'>
        <h2>
          Hey, {username} <br />
          You did {number} workouts this month!
        </h2>
        <h2>QUICK START</h2>
      </div>
    </>
  );
};

export default Home;
