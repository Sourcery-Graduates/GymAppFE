import { ExerciseDetails } from '@/types/entities/Exercise';
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import './ExerciseListemBack.scss';

interface ExerciseListItemBackProps {
  exercise: ExerciseDetails;
  handleClose: () => void;
}

const ExerciseListItemBack: React.FC<ExerciseListItemBackProps> = ({ exercise, handleClose }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(true);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const handleInfoClick = () => {
    setIsDescriptionOpen(false);
    setIsInfoOpen(true);
  };

  const handleDescriptionClick = () => {
    setIsInfoOpen(false);
    setIsDescriptionOpen(true);
  };

  return (
    <div className='exercise-list-item-back'>
      <div className='exercise-list-item-back__top'>
        <div className='exercise-list-item-back__top--icons'>
          <IconButton onClick={handleInfoClick} size='small' className='exercise-list-item-icon'>
            <InfoIcon />
          </IconButton>
          <IconButton onClick={handleDescriptionClick} size='small' className='exercise-list-item-icon'>
            <DescriptionIcon />
          </IconButton>
        </div>
        <h3 className='exercise-list-item-back__top--name'>{exercise.name}</h3>
        <div className='exercise-list-item-back__top--close-icon'>
          <IconButton onClick={handleClose} size='small' className='exercise-list-item-icon'>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      {exercise && isInfoOpen && (
        <ul className='exercise-list-item-back__list'>
          {exercise.force && (
            <li>
              <strong>Force:</strong> {exercise.force}
            </li>
          )}
          {exercise.level && (
            <li>
              <strong>Level:</strong> {exercise.level}
            </li>
          )}
          {exercise.mechanic && (
            <li>
              <strong>Mechanic:</strong> {exercise.mechanic}
            </li>
          )}
          {exercise.equipment && (
            <li>
              <strong>Equipment:</strong> {exercise.equipment}
            </li>
          )}
          {exercise.primaryMuscles && (
            <li>
              <strong>Primary Muscles:</strong> {exercise.primaryMuscles.join(', ')}
            </li>
          )}
          {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
            <li>
              <strong>Secondary Muscles:</strong> {exercise.secondaryMuscles.join(', ')}
            </li>
          )}
          {exercise.category && (
            <li>
              <strong>Category:</strong> {exercise.category}
            </li>
          )}
        </ul>
      )}
      {exercise.description && isDescriptionOpen && (
        <div className='exercise-list-item-back__description'>
          <strong>Description:</strong>
          {exercise.description.map((desc, index) => {
            return (
              <p key={index}>
                {index + 1}. {desc}
                <br />
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExerciseListItemBack;
