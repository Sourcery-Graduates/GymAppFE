import { ResponseWorkout } from '@/types/entities/Workout';
import { AppRoutes } from '@/types/routes';
import { useNavigate } from 'react-router-dom';
import './TrainingCard.scss';
import { mapToCreateWorkout } from '@/types/mapper/exercise';

interface TrainingCardProps {
  workout: ResponseWorkout;
}

const TrainingCard = ({ workout }: TrainingCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(AppRoutes.WORKOUT.replace(':workoutId', workout.id), {
      state: { workoutData: mapToCreateWorkout(workout) },
    });
  };

  return (
    <div onClick={handleCardClick} className={'workout-card'} key={workout.id}>
      <div className='workout-card__header'>
        <div className={'workout-card__header--name'}>{workout.name}</div>
        <div className={'workout-card__header--date'}>{new Date(workout.date).toLocaleDateString('en-GB')}</div>
      </div>
      <div className={'workout-card__exercises'}>{`Exercises: ${workout.exercises.length}`}</div>
    </div>
  );
};

export default TrainingCard;
