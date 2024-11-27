import AddIcon from '@mui/icons-material/Add';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateWorkout, WorkoutFormType } from '@/types/entities/Workout';
import ConfirmationDialog from '@/app/components/dialogs/ConfirmationDialog';
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
import ExerciseModal from '@/app/components/exerciseModal/ExerciseModal.tsx';
import {
  mapRoutineExerciseToCreateWorkoutExercise,
  mapToCreateWorkout,
  mapToRoutineExercise,
} from '@/types/mapper/exercise.ts';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { CreateRoutineExercise } from '@/types/entities/Exercise.ts';
import { AppRoutes } from '@/types/routes.ts';
import SaveIcon from '@mui/icons-material/Save';
import AppAlert from '@/app/components/alerts/AppAlert.tsx';

interface WorkoutFormProps {
  initialWorkout: CreateWorkout;
  typeOfWorkout: 'new_workout' | 'existing_workout';
}

dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  weekStart: 1,
});

const WorkoutForm = ({ initialWorkout, typeOfWorkout }: WorkoutFormProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClose = () => setModalOpen(false);
  const navigate = useNavigate();

  const handleOpenConfirmationDialog = () => {
    setOpenConfirmationDialog(true);
  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  };

  const handleConfirm = async () => {
    handleDeleteWorkout();
    setOpenConfirmationDialog(false);
  };

  const isNewWorkout: boolean = useMemo(() => {
    return typeOfWorkout === 'new_workout';
  }, []);

  const { control, handleSubmit, register } = useForm<WorkoutFormType>({
    defaultValues: initialWorkout,
  });

  const onSubmit = (data: CreateWorkout) => {
    if (isNewWorkout) {
      handleCreateWorkout(data);
    } else handleUpdateWorkout(data);
  };
  const handleSnackbarClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason && reason !== 'timeout') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleCreateWorkout = (data: CreateWorkout) => {
    createWorkout(data).then((response) => {
      if (isNewWorkout) {
        navigate(AppRoutes.WORKOUT.replace(':workoutId', response?.id), {
          state: { workoutData: mapToCreateWorkout(response) },
        });
      }
    });
  };

  const handleUpdateWorkout = (data: CreateWorkout) => {
    updateWorkout(data).then(() => {
      setSnackbarOpen(true);
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
      <form className='workout-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='workout-create'>
          <div className='workout-create-header'>
            <Typography variant='h4' gutterBottom>
              {isNewWorkout ? 'New Workout' : 'Workout'}
            </Typography>
            <div className='workout-options'>
              {!isNewWorkout && (
                <Button className='delete-workout-button' size='small' onClick={handleOpenConfirmationDialog}>
                  <DeleteForeverIcon fontSize='small' /> &nbsp; Delete Workout
                </Button>
              )}
              <Button type='submit' className='create-workout-button' size='small'>
                {isNewWorkout ? (
                  'Create Workout'
                ) : (
                  <>
                    <SaveIcon fontSize='small' /> &nbsp; Save Workout
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
                      // Bugs on trying to attach that to css classes
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
              <TextField className='comment-field' {...register('comment')} multiline maxRows={10} label='Comment' />
            </div>
          </div>
          <Typography variant='h6' sx={{ marginTop: '16px' }}>
            Exercises:
          </Typography>
          <div className='exercise-list-wrapper'>
            {exerciseFields.map((exercise, exerciseIndex) => (
              <ExerciseCard
                key={exercise.id}
                exerciseIndex={exerciseIndex}
                control={control}
                removeExercise={removeExercise}
              />
            ))}
          </div>
          <Button type='button' onClick={addNewExerciseModal}>
            <AddIcon fontSize='small' /> &nbsp;NEW EXERCISE
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
      <ConfirmationDialog
        description='Are you sure you want to delete this Workout?'
        open={openConfirmationDialog}
        onConfirm={handleConfirm}
        onClose={handleCloseConfirmationDialog}
      />
      <AppAlert
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        text='Workout saved successfully'
        severity='success'
      />
    </>
  );
};

export default WorkoutForm;
