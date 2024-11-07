import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Workout } from '@/types/entities/Workout';
import { RoutineExercise } from '@/types/entities/Routine';
import { createWorkout } from '@/api/workoutApi';
import { AppRoutes } from '@/types/routes';
import { Typography, List, ListItem, ListItemText, Divider, Grid } from '@mui/material';
import Button from '@/app/components/buttons/Button/Button.tsx';

const WorkoutCreate: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    const routineData = location.state?.routineData;

    if (routineData) {
      const initialWorkout: Workout = {
        name: routineData.routine.name,
        date: new Date(),
        comment: '',
        routineId: routineData.routine.id,
        exercises: routineData.exercises.map((routineExercise: RoutineExercise) => ({
          workoutExerciseId: null,
          exercise: routineExercise.exercise,
          orderNumber: routineExercise.orderNumber,
          notes: routineExercise.notes || '',
          sets: Array.from(
            { length: routineExercise.defaultsSets || 1 },
            (_, index) => ({
              workoutExerciseSetId: null,
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
          onClick={handleCreateWorkout}
          className="create-workout-button"
          type="button"
          size="big"
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
              Exercise {index + 1}: {exercise.exercise.name}
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
