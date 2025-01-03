import useAuth from '../common/hooks/useAuth';
import UserMessageList from './UserMessageList/UserMessageList';
import './Home.scss';

const Home = () => {
  const { username } = useAuth();

  return (
    <>
      <div className='home'>
        <h2 className='home__title'>
          Hey, {username}!<br />
        </h2>
        <UserMessageList />
      </div>
    </>
  );
};

export default Home;
