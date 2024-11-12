import React, { useState } from 'react';
import { WorkoutExercise, WorkoutExerciseSet } from '@/types/entities/Workout.ts';
import { Typography, Divider, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import './ExerciseCard.scss';
import Notes from '@/app/myTraining/workout/workoutForm/exerciseCard/notes/Notes';
import SetList from '@/app/myTraining/workout/workoutForm/exerciseCard/setList/SetList';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Controller, useFieldArray } from 'react-hook-form';

type ExerciseCardProps = {
  exerciseIndex: number;
  control: any;
  removeExercise: any;
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
    <div className='exercise-card' style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Controller
          name={`exercises[${exerciseIndex}].exercise.name`}
          control={control}
          render={({ field }) => (
            <Typography variant='h6' gutterBottom>
              {field.value}
            </Typography>
          )}
        />
        <div>
          {!isEditing ? (
            <Tooltip title='Edit'>
              <EditIcon onClick={handleEdit} style={{ cursor: 'pointer', marginRight: '8px' }} />
            </Tooltip>
          ) : (
            <Tooltip title='Save'>
              <SaveIcon onClick={handleStopEditing} style={{ cursor: 'pointer', marginRight: '8px' }} />
            </Tooltip>
          )}
          <Tooltip title='Delete'>
            <CloseIcon
              onClick={() => {
                removeExercise(exerciseIndex);
              }}
              style={{ cursor: 'pointer' }}
            />
          </Tooltip>
        </div>
      </div>
      <Divider className='divider' />
      <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', flexGrow: '1' }}>
        <div>
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
