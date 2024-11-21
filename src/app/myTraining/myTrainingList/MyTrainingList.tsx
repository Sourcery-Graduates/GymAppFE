import TrainingCard from '@/app/myTraining/myTrainingList/trainingCard/TrainingCard';
import { ResponseWorkout } from '@/types/entities/Workout';

interface MyTrainingListProps {
  data: ResponseWorkout[] | undefined;
}

const MyTrainingList = ({ data }: MyTrainingListProps) => {
  return (
    <>
      {data?.map((workout) => {
        return <TrainingCard key={workout.id} workout={workout} />;
      })}
    </>
  );
};

export default MyTrainingList;
