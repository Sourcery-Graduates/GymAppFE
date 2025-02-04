import { ExerciseDetails } from '@/types/entities/Exercise';
import React, { useState } from 'react';
import './ExerciseListItem.scss';

interface ExerciseCardProps {
  exercise: ExerciseDetails;
}

const ExerciseListItem: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const imageUrl = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setIsImageLoaded(false);
  };

  return (
    <div className='exercise-list-item'>
      <h3>{exercise.name}</h3>
      <div className={`exercise-list-item__image ${isImageLoaded ? '--loaded' : '--loading'}`}>
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
  );
};

export default ExerciseListItem;
