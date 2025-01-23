import useAuth from '../common/hooks/useAuth';
import UserMessageList from './userMessageList/UserMessageList';
import MostUsedRoutines from './mostUsedRoutines/MostUsedRoutines';
import dayjs from 'dayjs';
import Charts from './charts/Charts';
import WelcomeMessage from '../components/welcomeMessage/WelcomeMessage';
import { useQuery } from '@tanstack/react-query';
import { checkIsUserNew } from '@/api/workoutStats';
import BasicSpinner from '../components/loaders/BasicSpinner';
import ErrorPage from '../errorPage/ErrorPage';
import './Home.scss';

const Home = () => {
  const { username } = useAuth();

  const {
    data: isUserNew,
    error: errorQuery,
    isLoading,
  } = useQuery<boolean>({
    queryKey: ['is-user-new'],
    queryFn: checkIsUserNew,
  });

  if (isLoading) {
    return <BasicSpinner />;
  }

  if (errorQuery) {
    <ErrorPage />;
  }

  if (isUserNew === true) {
    return (
      <div className='home__content'>
        <WelcomeMessage />
      </div>
    );
  }

  return (
    <>
      <div className='home'>
        <h2 className='home__title'>
          Hi, {username}
          <p className='home__date'>Today, {dayjs().format('DD MMM')}</p>
        </h2>
        <div className='home__content'>
          <UserMessageList />
          <MostUsedRoutines />
          <Charts />
        </div>
      </div>
    </>
  );
};

export default Home;
