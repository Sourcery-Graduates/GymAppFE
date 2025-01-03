import useWorkoutCount from '@/app/common/hooks/useWorkoutCount';
import calculateWeightComparison from '@/app/common/utils/calculateWeightComparison';
import BasicSpinner from '@/app/components/loaders/BasicSpinner';
import ErrorPage from '@/app/errorPage/ErrorPage';
import UserMessageCard from './userMessageCard/UserMessageCard';
import { useQuery } from '@tanstack/react-query';
import './UserMessageList.scss';
import { getTotalWeight } from '@/api/workout';

const UserMessageList = () => {
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

  const { data: totalWeight } = useQuery<number>({
    queryKey: ['totalWeight', 0],
    queryFn: getTotalWeight,
    retry: false,
  });

  const workoutDifference = currentMonthCount - previousMonthCount;

  //TODO: To refactor probably
  if (isCurrentMonthCountLoading || isPreviousMonthCountLoading || !totalWeight) {
    return <BasicSpinner />;
  }

  if (currentMonthCountErrorQuery || previousMonthCountErrorQuery || totalWeight === undefined) {
    <ErrorPage />;
  }

  return (
    <div className='user-message-list'>
      <UserMessageCard
        isLoading={false}
        data={currentMonthCount}
        successText={(count) => {
          if (count === 1) {
            return `You've done ${count} workout this month!`;
          } else {
            return `You've done ${count} workouts this month!`;
          }
        }}
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
      {totalWeight > 500 && (
        <UserMessageCard
          isLoading={false}
          data={totalWeight}
          successText={() => {
            return `${calculateWeightComparison(totalWeight)}`;
          }}
        />
      )}
    </div>
  );
};

export default UserMessageList;
