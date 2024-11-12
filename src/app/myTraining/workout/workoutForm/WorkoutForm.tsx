import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateWorkout, WorkoutFormType } from '@/types/entities/Workout';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { createWorkout, deleteWorkout, updateWorkout } from '@/api/workout';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Typography } from '@mui/material';
import Button from '@/app/components/buttons/Button/Button.tsx';
import ExerciseCard from './exerciseCard/ExerciseCard.tsx';
import dayjs from 'dayjs';
import './WorkoutForm.scss';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import updateLocale from 'dayjs/plugin/updateLocale';
import ExerciseModal from '@/app/routines/exersiceModal/ExerciseModal.tsx';
import {
  mapRoutineExerciseToCreateWorkoutExercise,
  mapToCreateWorkout,
  mapToRoutineExercise,
} from '@/types/mapper/exercise.ts';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { CreateRoutineExercise } from '@/types/entities/Exercise.ts';
import { AppRoutes } from '@/types/routes.ts';
import SaveIcon from '@mui/icons-material/Save';
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  weekStart: 1,
});

interface WorkoutFormProps {
  initialWorkout: CreateWorkout;
  typeOfWorkout: 'new_workout' | 'existing_workout';
}

const WorkoutForm = ({ initialWorkout, typeOfWorkout }: WorkoutFormProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const navigate = useNavigate();

  const isNewWorkout: boolean = useMemo(() => {
    return typeOfWorkout === 'new_workout';
  }, []);

  const { control, handleSubmit, register } = useForm<WorkoutFormType>({
    defaultValues: initialWorkout,
  });

  const onSubmit = (data: CreateWorkout) => {
    data.routineId = initialWorkout.routineId;
    if (isNewWorkout) {
      handleCreateWorkout(data);
    } else handleUpdateWorkout(data);
  };

  const handleCreateWorkout = (data: CreateWorkout) => {
    createWorkout(data).then((response) => {
      if (isNewWorkout) {
        alert('created workout');
        navigate(AppRoutes.WORKOUT.replace(':workoutId', response?.id), {
          state: { workoutData: mapToCreateWorkout(response) },
        });
      }
    });
  };

  const handleUpdateWorkout = (data: CreateWorkout) => {
    updateWorkout(data).then((response) => {
      alert('saved workout');
      console.log('updated workout response ', response);
    });
  };

  const handleDeleteWorkout = () => {
    if (initialWorkout.id) {
      deleteWorkout(initialWorkout.id).then(() => {
        navigate(AppRoutes.MY_TRAINING);
      });
    }
  };

  const AddNewExercise = (data: CreateRoutineExercise, name: string) => {
    console.log('exercise add ', data);
    const routineExercise = mapToRoutineExercise(data, name, exerciseFields.length + 1);
    const workoutExercise = mapRoutineExerciseToCreateWorkoutExercise(routineExercise);
    appendExercise(workoutExercise);
  };

  const addNewExerciseModal = () => {
    setModalOpen(true);
  };
  const {
    fields: exerciseFields,
    append: appendExercise,
    remove: removeExercise,
  } = useFieldArray({
    control,
    name: 'exercises',
  });

  if (initialWorkout == undefined) {
    navigate(AppRoutes.HOME);
  }

  return (
    <>
      <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <div className='workout-create'>
          <div className='workout-create-header'>
            <Typography variant='h4' gutterBottom>
              {isNewWorkout ? 'New Workout' : 'Workout'}
            </Typography>
            <div>
              {!isNewWorkout && (
                <Button className='delete-workout-button' onClick={handleDeleteWorkout}>
                  <DeleteForeverIcon fontSize='small' /> &nbsp; Delete Workout
                </Button>
              )}
              <Button type='submit' className='create-workout-button' size='big'>
                {isNewWorkout ? (
                  'Create Workout'
                ) : (
                  <>
                    <SaveIcon /> &nbsp; Save Workout
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className='workout-create-info'>
            <div className='name-and-date'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  control={control}
                  name='date'
                  render={({ field }) => (
                    <DatePicker
                      className='calendar'
                      label='Workout Date'
                      {...field}
                      onChange={(date) => field.onChange(date)}
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
                  )}
                />
              </LocalizationProvider>
              <TextField {...register('name')} label='Workout name' />
            </div>
            <div className='comment'>
              <TextField {...register('comment')} multiline maxRows={10} label='Comment' />
            </div>
          </div>
          <Typography variant='h6' style={{ marginTop: '16px' }}>
            Exercises:
          </Typography>
          <div className='exercise-list-wrapper'>
            {exerciseFields.map((exercise, exerciseIndex) => (
              <ExerciseCard
                key={exercise.exerciseId}
                exerciseIndex={exerciseIndex}
                control={control}
                removeExercise={removeExercise}
              />
            ))}
          </div>
          <Button type='button' onClick={addNewExerciseModal} style={{ height: '50px' }}>
            Add new exercise
          </Button>
        </div>
      </form>
      <ExerciseModal
        open={modalOpen}
        handleClose={handleClose}
        onSave={(data, name) => {
          AddNewExercise(data, name);
        }}
      />
    </>
  );
};

export default WorkoutForm;
