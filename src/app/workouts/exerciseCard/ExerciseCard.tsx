import React from 'react';
import { WorkoutExercise } from '@/types/entities/Workout.ts';
import { Typography, Divider, List, ListItem, ListItemText, TextField, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import './ExerciseCard.scss';
import Button from '@/app/components/buttons/Button/Button';

type ExerciseCardProps = {
  exercise: WorkoutExercise;
};

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const handleDeleteExercise = () => {
    alert('exercise deleted' + exercise.workoutExerciseId);
  };

  const handleDeleteSet = (id: string | null) => {
    alert('set deleted' + id);
  };

  const handleAddSet = () => {
    alert('set added');
  };

  return (
    <div className='exercise-card'>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography variant='h6' gutterBottom>
          {exercise.exercise.name}{' '}
        </Typography>
        <CloseIcon onClick={handleDeleteExercise} style={{ cursor: 'pointer' }} />
      </div>

      <Divider className='divider' />
      <List>
        {exercise.sets.map((set, setIndex) => (
          <ListItem key={set.setNumber}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div>set {setIndex + 1} </div>
              <TextField sx={{ width: '75px' }} label='reps' defaultValue={set.reps} />
              <TextField
                sx={{ width: '75px' }}
                label='weight'
                defaultValue={set.weight}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment className='helper-text' position='end' style={{ color: '#6c757d' }}>
                        <span className='helper-text'>kg</span>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                sx={{ width: '75px' }}
                label='rest time'
                defaultValue={set.restTime}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <span className='helper-text'>s</span>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              {setIndex !== 0 && (
                <CloseIcon style={{ cursor: 'pointer' }} onClick={() => handleDeleteSet(set.workoutExerciseSetId)} />
              )}
            </div>
          </ListItem>
        ))}
      </List>
      <Button onClick={handleAddSet}>Add new set</Button>
      <Divider className='divider' />
      <Typography variant='body2' className='notes'>
        Notes: {exercise.notes || 'None'}
      </Typography>
    </div>
  );
};

export default ExerciseCard;
