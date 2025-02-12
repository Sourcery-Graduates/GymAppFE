import { ExerciseDetails } from '@/types/entities/Exercise';
import React, { useRef, useState } from 'react';
import ExerciseListItemBack from '../exerciseListItemBack/ExerciseListItemBack';
import './ExerciseListItem.scss';

interface ExerciseCardProps {
  exercise: ExerciseDetails;
}

const ExerciseListItem: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const imageUrl = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setIsImageLoaded(false);
  };

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      ref={itemRef}
      className={`exercise-list-item ${isFlipped ? 'exercise-list-item--flipped' : 'exercise-list-item'}`}
    >
      <div className='exercise-list-item__front' onClick={handleCardClick}>
        <h3>{exercise.name}</h3>
        <div
          className={`exercise-list-item__image ${isImageLoaded ? 'exercise-list-item__image--loaded' : 'exercise-list-item__image--loading'}`}
        >
          {exercise.images && (
            <img
              className='exercise-list-item__image--content'
              src={`${imageUrl}${exercise.images[0]}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              alt={exercise.name}
            />
          )}
        </div>
      </div>
      <div className='exercise-list-item__back'>
        <ExerciseListItemBack exercise={exercise} handleClose={() => setIsFlipped((prev) => !prev)} />
      </div>
    </div>
  );
};

export default ExerciseListItem;
