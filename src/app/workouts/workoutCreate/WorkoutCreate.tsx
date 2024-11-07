// src/pages/WorkoutCreateFromRoutine.tsx

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Workout } from '@/types/entities/Workout';
import { RoutineExercise } from '@/types/entities/Routine';
import { createWorkout } from '@/api/workoutApi';
import { AppRoutes } from '@/types/routes';
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider, Grid,
} from '@mui/material';

//TODO: to be removed
import { mockRoutineData } from '@/types/entities/mockRoutineData';

const WorkoutCreate: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    // TODO: remove comment when proper data fetching exists
    // const routineData = location.state?.routineData;
    const routineData = mockRoutineData; // mocked routineData

    if (routineData) {
      const initialWorkout: Workout = {
        name: routineData.routine.name,
        date: new Date(),
        comment: '',
        routineId: routineData.routine.id,
        exercises: routineData.exercises.map((routineExercise: RoutineExercise) => ({
          exerciseId: routineExercise.exercise.id,
          orderNumber: routineExercise.orderNumber,
          notes: routineExercise.notes || '',
          sets: Array.from(
            { length: routineExercise.defaultsSets || 1 },
            (_, index) => ({
              setNumber: index + 1,
              reps: routineExercise.defaultReps,
              weight: routineExercise.defaultWeight,
              restTime: routineExercise.defaultRestTime,
              comment: '',
            })
          ),
        })),
      };
      setWorkout(initialWorkout);
    } else {
      console.error('No routineData provided');
    }
  }, [location.state]);

  const handleCreateWorkout = async () => {
    if (workout) {
      try {
        const savedWorkout = await createWorkout(workout);
        // TODO: remove comment when WorkoutDetails.tsx is created
        // navigate(AppRoutes.WORKOUT_DETAILS.replace(':workoutId', savedWorkout.id!));
      } catch (error) {
        console.error('Error creating workout:', error);
        alert('Failed to create workout.');
      }
    }
  };

  if (!workout) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Typography variant="h4" gutterBottom>
          Create Workout from Routine
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateWorkout}
        >
          CREATE WORKOUT
        </Button>
      </div>

      <Typography variant="h6">Workout Name:</Typography>
      <Typography variant="body1">{workout.name}</Typography>

      <Typography variant="h6" style={{ marginTop: '16px' }}>
        Date:
      </Typography>
      <Typography variant="body1">{workout.date.toDateString()}</Typography>

      {workout.comment && (
        <>
          <Typography variant="h6" style={{ marginTop: '16px' }}>
            Comment:
          </Typography>
          <Typography variant="body1">{workout.comment}</Typography>
        </>
      )}

      <Typography variant="h6" style={{ marginTop: '16px' }}>
        Exercises:
      </Typography>
      <Grid container spacing={3} style={{ marginTop: '16px', width: '60%' }}>
        {workout.exercises.map((exercise, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Typography variant="h6" gutterBottom>
              Exercise {index + 1}: {exercise.exerciseId}
            </Typography>
            <Divider style={{ margin: '8px 0' }} />
            <List>
              {exercise.sets.map((set, setIndex) => (
                <ListItem key={setIndex}>
                  <ListItemText
                    primary={<Typography variant="subtitle2">Set {set.setNumber}</Typography>}
                    secondary={
                      <Typography variant="body2">
                        <strong>Reps:</strong> {set.reps || 'N/A'}, <strong>Weight:</strong> {set.weight || 'N/A'}, <strong>Rest Time:</strong> {set.restTime || 'N/A'}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Divider style={{ margin: '8px 0' }} />
            <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
              Notes: {exercise.notes || 'None'}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
  export default WorkoutCreate;
