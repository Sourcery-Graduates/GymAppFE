import React, { useState } from 'react';
import { Typography, Divider, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import './ExerciseCard.scss';
import Notes from '@/app/pages/myTraining/workout/workoutForm/exerciseCard/notes/Notes';
import SetList from '@/app/pages/myTraining/workout/workoutForm/exerciseCard/setList/SetList';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import { Control, Controller, useFieldArray, UseFieldArrayRemove } from 'react-hook-form';

type ExerciseCardProps = {
  exerciseIndex: number;
  control: Control<any>;
  removeExercise: UseFieldArrayRemove;
};

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exerciseIndex, control, removeExercise }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleStopEditing = () => {
    setIsEditing(false);
  };

  const {
    fields: setFields,
    append: appendSet,
    remove: removeSet,
  } = useFieldArray({
    control,
    name: `exercises[${exerciseIndex}].sets`,
  });

  return (
    <div className='exercise-card' data-testid='exercise-card'>
      <div className='exercise-card-header' data-testid='exercise-card-header'>
        <Controller
          name={`exercises[${exerciseIndex}].exerciseName`}
          control={control}
          render={({ field }) => (
            <Typography variant='h6' gutterBottom>
              {field.value}
            </Typography>
          )}
        />
        <div>
          {!isEditing ? (
            <Tooltip title='Edit' data-testid='edit-exercise-icon'>
              <EditIcon onClick={handleEdit} sx={{ cursor: 'pointer', marginRight: '8px' }} />
            </Tooltip>
          ) : (
            <Tooltip title='Stop editing' data-testid='stop-editing-exercise-icon'>
              <EditOffIcon onClick={handleStopEditing} sx={{ cursor: 'pointer', marginRight: '8px' }} />
            </Tooltip>
          )}
          <Tooltip title='Delete'>
            <CloseIcon
              onClick={() => {
                removeExercise(exerciseIndex);
              }}
              sx={{ cursor: 'pointer' }}
            />
          </Tooltip>
        </div>
      </div>
      <Divider className='divider' />
      <div className='exercise-card-body' data-testid='exercise-card-body'>
        <div data-testid='exercise-set-list'>
          <SetList
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            setFields={setFields}
            appendSet={appendSet}
            removeSet={removeSet}
            exerciseIndex={exerciseIndex}
            control={control}
          />
        </div>
        <Typography variant='body2' className='notes'>
          <Divider className='divider' />
          <Notes control={control} isEditing={isEditing} exerciseIndex={exerciseIndex} />
        </Typography>
      </div>
    </div>
  );
};

export default ExerciseCard;
