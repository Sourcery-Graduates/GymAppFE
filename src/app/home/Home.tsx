import useAuth from '../common/hooks/useAuth';
import UserMessageList from './userMessageList/UserMessageList';
import MostUsedRoutines from './mostUsedRoutines/MostUsedRoutines';
import dayjs from 'dayjs';
import './Home.scss';
import Charts from './charts/Charts';

const Home = () => {
  const { username } = useAuth();

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
