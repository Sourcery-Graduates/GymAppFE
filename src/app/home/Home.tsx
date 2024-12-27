import useAuth from '../common/hooks/useAuth';
import BasicSpinner from '../components/loaders/BasicSpinner';
import ErrorPage from '../errorPage/ErrorPage';
import useWorkoutCount from '../common/hooks/useWorkoutCount';
import UserMessageCard from '../components/userMessageCard/UserMessageCard';
import './Home.scss';
import calculateWeightComparison from '../common/utils/calculateWeightComparison';

const Home = () => {
  const { username } = useAuth();

  const {
    data: currentMonthCount = 0,
    isLoading: isCurrentMonthCountLoading,
    error: currentMonthCountErrorQuery,
  } = useWorkoutCount(0);

  const {
    data: previousMonthCount = 0,
    isLoading: isPreviousMonthCountLoading,
    error: previousMonthCountErrorQuery,
  } = useWorkoutCount(1);

  const totalWeightMock = 50000;

  const workoutDifference = currentMonthCount - previousMonthCount;

  if (isCurrentMonthCountLoading || isPreviousMonthCountLoading) {
    return <BasicSpinner />;
  }

  if (currentMonthCountErrorQuery || previousMonthCountErrorQuery) {
    <ErrorPage />;
  }

  return (
    <>
      <div className='home'>
        <h2 className='home__title'>
          Hey, {username}!<br />
        </h2>
        <div className='home__cards'>
          <UserMessageCard
            isLoading={isCurrentMonthCountLoading}
            data={currentMonthCount}
            successText={(count) => `You've done ${count} workouts this month!`}
          />
          {workoutDifference > 0 && (
            <UserMessageCard
              isLoading={isPreviousMonthCountLoading}
              data={previousMonthCount}
              successText={(workoutDifference) => {
                if (workoutDifference === 1) {
                  return `You've done ${workoutDifference} more workout than last month!`;
                } else {
                  return `You've done ${workoutDifference} more workouts than last month!`;
                }
              }}
            />
          )}
          <UserMessageCard //TODO: Mock data
            isLoading={false}
            data={totalWeightMock}
            successText={() => {
              return `${calculateWeightComparison(totalWeightMock)}`;
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
