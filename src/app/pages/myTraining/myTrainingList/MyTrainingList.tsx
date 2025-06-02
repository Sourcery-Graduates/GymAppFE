import TrainingCard from '@/app/pages/myTraining/myTrainingList/trainingCard/TrainingCard';
import { ResponseWorkout } from '@/types/entities/Workout';
import './MyTrainingList.scss';

interface MyTrainingListProps {
  data: ResponseWorkout[] | undefined;
}

const MyTrainingList = ({ data }: MyTrainingListProps) => {
  return (
    <div className='workout-container-list'>
      <div className='workout-list' data-testid='workout-list'>
        {data?.map((workout) => {
          return <TrainingCard key={workout.id} workout={workout} />;
        })}
      </div>
    </div>
  );
};

export default MyTrainingList;
