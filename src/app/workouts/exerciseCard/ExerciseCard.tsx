import React from 'react';
import { WorkoutExercise } from '@/types/entities/Workout.ts';
import { Typography, Divider, List, ListItem, ListItemText } from '@mui/material';

import './ExerciseCard.scss';

type ExerciseCardProps = {
  exercise: WorkoutExercise;
};

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  return (
    <div className='exercise-card'>
      <Typography variant='h6' gutterBottom>
        {exercise.exercise.name}
      </Typography>
      <Divider className='divider' />
      <List>
        {exercise.sets.map((set, setIndex) => (
          <ListItem key={setIndex}>
            <ListItemText
              primary={<Typography variant='subtitle2'>Set {set.setNumber}</Typography>}
              secondary={
                <Typography variant='body2'>
                  <strong>Reps:</strong> {set.reps || 'N/A'}, <strong>Weight:</strong>{' '}
                  {set.weight || 'N/A'}, <strong>Rest Time:</strong> {set.restTime || 'N/A'}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
      <Divider className='divider' />
      <Typography variant='body2' className='notes'>
        Notes: {exercise.notes || 'None'}
      </Typography>
    </div>
  );
};

export default ExerciseCard;
