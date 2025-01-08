import useAuth from '../common/hooks/useAuth';
import UserMessageList from './UserMessageList/UserMessageList';
import './Home.scss';
import dayjs from 'dayjs';

const Home = () => {
  const { username } = useAuth();

  return (
    <>
      <div className='home'>
        <h2 className='home__title'>
          Hi, {username}<br />
          <p className='home__date'>Today, {dayjs().format('DD MMM')}</p>
        </h2>
        <UserMessageList />
      </div>
    </>
  );
};

export default Home;
