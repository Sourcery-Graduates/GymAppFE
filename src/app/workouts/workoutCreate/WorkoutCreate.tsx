import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Workout } from '@/types/entities/Workout';
import { RoutineExercise } from '@/types/entities/Routine';
import { createWorkout } from '@/api/workoutApi';
import { AppRoutes } from '@/types/routes';
import { Typography } from '@mui/material';
import Button from '@/app/components/buttons/Button/Button.tsx';
import ExerciseCard from '../exerciseCard/ExerciseCard.tsx';

import './WorkoutCreate.scss';

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
        // TODO: Uncomment when WorkoutDetails.tsx is created
        // navigate(AppRoutes.WORKOUT_DETAILS.replace(':workoutId', savedWorkout.id!));
      } catch (error) {
        alert('Failed to create workout.');
      }
    }
  };

  if (!workout) {
    return <div>Loading...</div>;
  }

  const sortedExercises = [...workout.exercises].sort(
    (a, b) => a.orderNumber - b.orderNumber
  );

  return (
    <div className='workout-create'>
      <div className='workout-create-header'>
        <Typography variant='h4' gutterBottom>
          Create Workout from Routine
        </Typography>
        <Button onClick={handleCreateWorkout} className='create-workout-button' size='big'>
          CREATE WORKOUT
        </Button>
      </div>

      <Typography variant='h6'>Workout Name:</Typography>
      <Typography variant='body1'>{workout.name}</Typography>

      <Typography variant='h6' style={{ marginTop: '16px' }}>
        Date:
      </Typography>
      <Typography variant='body1'>{workout.date.toDateString()}</Typography>

      {workout.comment && (
        <>
          <Typography variant='h6' style={{ marginTop: '16px' }}>
            Comment:
          </Typography>
          <Typography variant='body1'>{workout.comment}</Typography>
        </>
      )}

      <Typography variant='h6' style={{ marginTop: '16px' }}>
        Exercises:
      </Typography>
      <div className='exercise-list-wrapper'>
        {sortedExercises.map((exercise) => (
          <ExerciseCard key={exercise.exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
};

export default WorkoutCreate;
