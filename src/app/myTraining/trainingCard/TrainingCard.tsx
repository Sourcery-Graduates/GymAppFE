import { Workout } from '@/types/entities/Workout';
import { AppRoutes } from '@/types/routes';
import { useNavigate } from 'react-router-dom';
import './TrainingCard.scss';

interface TrainingCardProps {
  workout: Workout;
}

const TrainingCard = ({ workout }: TrainingCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(AppRoutes.WORKOUT.replace(':workoutId', workout.id));
  };

  return (
    <div onClick={handleCardClick} className={'workout-card'} key={workout.id}>
      <div className='workout-card__header'>
        <div className={'workout-card__header--name'}>{workout.name}</div>
        <div className={'workout-card__header--date'}>{workout.date.toLocaleDateString('en-gb')}</div>
      </div>
      <div className={'workout-card__exercises'}>{`Exercises: ${workout.exercises.length}`}</div>
    </div>
  );
};

export default TrainingCard;
