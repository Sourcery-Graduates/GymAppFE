import React, { useState } from 'react';
import { WorkoutExercise, WorkoutExerciseSet } from '@/types/entities/Workout.ts';
import { Typography, Divider, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import './ExerciseCard.scss';
import Notes from '@/app/workouts/exerciseCard/notes/Notes';
import SetList from '@/app/workouts/exerciseCard/setList/SetList';
import EditIcon from '@mui/icons-material/Edit';

type ExerciseCardProps = {
  exercise: WorkoutExercise;
  handleDeleteExercise: (orderNumber: number) => void;
  handleDeleteSet: (exerciseId: string, setNumber: number) => void;
  handleAddNewSet: (exerciseId: string, newSet: WorkoutExerciseSet) => void;
};

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  handleDeleteExercise,
  handleDeleteSet,
  handleAddNewSet,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className='exercise-card' style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography variant='h6' gutterBottom>
          {`${exercise.orderNumber}. ${exercise.exercise.name}`}
        </Typography>
        <div>
          {!isEditing && (
            <Tooltip title='Edit'>
              <EditIcon onClick={handleEdit} style={{ cursor: 'pointer', marginRight: '8px' }} />
            </Tooltip>
          )}
          <Tooltip title='Delete'>
            <CloseIcon onClick={() => handleDeleteExercise(exercise.orderNumber)} style={{ cursor: 'pointer' }} />
          </Tooltip>
        </div>
      </div>
      <Divider className='divider' />
      <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', flexGrow: '1' }}>
        <div>
          <SetList
            handleDeleteSet={(setNumber) => handleDeleteSet(exercise.id, setNumber)}
            handleAddNewSet={(newSet) => handleAddNewSet(exercise.id, newSet)}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            sets={exercise.sets}
          />
        </div>
        <Typography variant='body2' className='notes'>
          <Divider className='divider' />
          <Notes notes={exercise.notes} />
        </Typography>
      </div>
    </div>
  );
};

export default ExerciseCard;
