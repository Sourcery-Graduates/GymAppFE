import { ExerciseDetails } from '@/types/entities/Exercise';
import React from 'react';
import './ExerciseListItem.scss';

interface ExerciseCardProps {
  exercise: ExerciseDetails;
}

const ExerciseListItem: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const imageUrl = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';

  return (
    <div className='exercise-list-item'>
      <h3>{exercise.name}</h3>
      {exercise.images && <img className='exercise-list-item__image' src={`${imageUrl}${exercise.images[0]}`}></img>}
    </div>
  );
};

export default ExerciseListItem;
