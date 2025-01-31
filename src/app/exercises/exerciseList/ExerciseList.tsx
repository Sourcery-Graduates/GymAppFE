import { ExerciseDetails } from '@/types/entities/Exercise';
import React from 'react';
import ExerciseListItem from './exerciseListItem/ExerciseListItem';
import './ExerciseList.scss';

interface ExerciseListProps {
  exercises: ExerciseDetails[];
}

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises }) => {
  return (
    <div className='exercise-list'>
      {exercises.map((exercise) => (
        <ExerciseListItem exercise={exercise} key={exercise.id} />
      ))}
    </div>
  );
};

export default ExerciseList;
