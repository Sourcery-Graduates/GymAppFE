import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Workout, WorkoutExercise, WorkoutExerciseSet } from '@/types/entities/Workout';
import { RoutineExercise } from '@/types/entities/Routine';
import { createWorkout } from '@/api/workoutApi';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Typography } from '@mui/material';
import Button from '@/app/components/buttons/Button/Button.tsx';
import ExerciseCard from '../exerciseCard/ExerciseCard.tsx';
import dayjs from 'dayjs';
import './WorkoutCreate.scss';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import updateLocale from 'dayjs/plugin/updateLocale';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ExerciseModal from '@/app/routines/exersiceModal/ExerciseModal.tsx';
import { mapToRoutineExercise, mapToWorkoutExercise } from '@/types/mapper/exercise.ts';
import { CreateRoutineExercise } from '@/types/entities/Exercise.ts';

dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  weekStart: 1,
});

const WorkoutCreate: React.FC = () => {
  const location = useLocation();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [selectedDate, setSelectedDate] = React.useState(workout?.date ?? dayjs());
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    const routineData = location.state?.routineData;
    if (routineData) {
      const initialWorkout: Workout = {
        name: routineData.routine.name,
        date: new Date(),
        comment: '',
        exercises: routineData.exercises.map((routineExercise: RoutineExercise) =>
          mapToWorkoutExercise(routineExercise),
        ),
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

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const addNewExerciseModal = () => {
    setModalOpen(true);
    alert('add new exercise');
  };

  const handleAddExercise = (createRoutineExercise: CreateRoutineExercise, name: string) => {
    const routineExercise: RoutineExercise = mapToRoutineExercise(createRoutineExercise, name);
    const workoutExercise: WorkoutExercise = mapToWorkoutExercise(routineExercise);
    if (workout) {
      setWorkout(
        (workout) =>
          workout && {
            ...workout,
            exercises: [...workout?.exercises, { ...workoutExercise, orderNumber: workout.exercises.length + 1 }],
          },
      );
    }
  };

  const handleDeleteExercise = (orderNumber: number) => {
    setWorkout(
      (workout) =>
        workout && {
          ...workout,
          exercises: workout?.exercises.filter((exercise) => exercise.orderNumber != orderNumber),
        },
    );
  };

  const handleDeleteSet = (exerciseId: string, setNumber: number) => {
    console.log('exerciseId ', exerciseId, ', setNumber setNumber');
    setWorkout((prevWorkout) =>
      prevWorkout
        ? {
            ...prevWorkout,
            exercises: prevWorkout.exercises.map((exercise) =>
              exercise.id === exerciseId
                ? {
                    ...exercise,
                    sets: exercise.sets.filter((set) => set.setNumber !== setNumber),
                  }
                : exercise,
            ),
          }
        : null,
    );
  };

  const handleAddNewSet = (exerciseId: string, newSet: WorkoutExerciseSet) => {
    setWorkout((prevWorkout) =>
      prevWorkout
        ? {
            ...prevWorkout,
            exercises: prevWorkout.exercises.map((exercise) =>
              exercise.id === exerciseId
                ? {
                    ...exercise,
                    sets: [...exercise.sets, { ...newSet, setNumber: exercise.sets.length + 1 }],
                  }
                : exercise,
            ),
          }
        : null,
    );
  };

  return (
    <div className='workout-create'>
      <div className='workout-create-header'>
        <Typography variant='h4' gutterBottom>
          New Workout
        </Typography>
        <Button onClick={handleCreateWorkout} className='create-workout-button' size='big'>
          CREATE WORKOUT
        </Button>
      </div>
      <div className='workout-create-info'>
        <div className='name-and-date'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className='calendar'
              label='Workout Date'
              value={selectedDate}
              onChange={handleDateChange}
              format='DD/MM/YYYY'
              // TODO CHANGE IT FROM SLOT PROPS
              slotProps={{
                desktopPaper: {
                  sx: {
                    backgroundColor: '#181818;', // Change the calendar background color
                  },
                },
                mobilePaper: {
                  sx: {
                    backgroundColor: '#181818;', // Mobile-specific background color
                  },
                },
                day: {
                  sx: {
                    '&.Mui-selected': {
                      backgroundColor: '#3f454b', // Selected day background
                      color: 'white', // Selected day text color
                    },
                    '&:not(.Mui-selected)': {
                      color: '#6c757d', // Unselected day color
                    },
                  },
                },
                switchViewButton: {
                  sx: {
                    color: '#6c757d', // Month selection arrow color
                  },
                },
                previousIconButton: {
                  sx: {
                    color: '#6c757d', // Left arrow color
                  },
                },
                nextIconButton: {
                  sx: {
                    color: '#6c757d', // Right arrow color
                  },
                },
              }}
            />
          </LocalizationProvider>
          <TextField label='Workout name' defaultValue={workout.name} />
        </div>
        <div className='comment'>
          <TextField multiline maxRows={10} label='Comment' defaultValue={workout.comment} />
        </div>
      </div>
      <Typography variant='h6' style={{ marginTop: '16px' }}>
        Exercises:
      </Typography>
      <div className='exercise-list-wrapper'>
        {workout.exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.exercise.id}
            exercise={exercise}
            handleDeleteExercise={(orderNumber) => handleDeleteExercise(orderNumber)}
            handleDeleteSet={(exerciseId: string, setNumber: number) => handleDeleteSet(exerciseId, setNumber)}
            handleAddNewSet={(exerciseId: string, newSet: WorkoutExerciseSet) => handleAddNewSet(exerciseId, newSet)}
          />
        ))}
      </div>
      <Button onClick={addNewExerciseModal} style={{ height: '50px' }}>
        Add new exercise
      </Button>
      <ExerciseModal
        open={modalOpen}
        handleClose={handleClose}
        onSave={(exercise, name) => handleAddExercise(exercise, name)}
      />
    </div>
  );
};

export default WorkoutCreate;
