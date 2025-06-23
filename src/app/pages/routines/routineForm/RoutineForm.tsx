import { createRoutine, updateRoutine, updateRoutineExercises } from '@/api/routineApi';
import Button from '@/app/components/buttons/Button/Button';
import { Routine, RoutineExercise } from '@/types/entities/Routine';
import { AppRoutes } from '@/types/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { IconButton, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { InferType } from 'yup';

import { routineValidationSchema } from './routineValidationSchema';

import './RoutineForm.scss';
import React from 'react';
import { useState } from 'react';
import ExerciseModal from '@/app/components/exerciseModal/ExerciseModal';
import ExercisesTable from '@/app/components/exercisesTable/ExercisesTable';
import { useRoutineExercises } from '@/app/common/context/RoutineExercisesContext';
import { CreateRoutineExercise } from '@/types/entities/Exercise';

type FormFields = InferType<typeof routineValidationSchema>;

const RoutineForm: React.FC<RoutineProps> = ({ routine }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { exercises, addExercise } = useRoutineExercises();

  const [modalOpen, setModalOpen] = useState(false);
  const handleClickOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (routine) {
      routine.name = data.name;
      routine.description = data.description;
      updateRoutineMutation({
        name: data.name,
        description: data.description,
        routineId: routine.id,
      });
    } else {
      createRoutineMutation({ name: data.name, description: data.description });
    }
  };

  const exerciseModalOnSaveHandler = (data: CreateRoutineExercise, name?: string) => {
    const exerciseData: RoutineExercise = {
      ...data,
      routineExerciseId: data.exerciseId,
      exercise: {
        id: data.exerciseId,
        name: name || '',
      },
    };
    addExercise(exerciseData);
  };

  const goBackHandler = () => {
    navigate(-1);
  };

  const { mutateAsync: updateRoutineExercisesMutation } = useMutation({
    mutationFn: ({ routineId, exercises }: any) => updateRoutineExercises(routineId, exercises),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'], exact: true });
      navigate(AppRoutes.ROUTINES);
    },
    onError: () => {
      alert('Failed to update exercises');
    },
  });

  const { mutateAsync: updateRoutineMutation } = useMutation({
    mutationFn: updateRoutine,
    onSuccess: async (updatedRoutine) => {
      await updateRoutineExercisesMutation({
        routineId: updatedRoutine.id,
        exercises,
      });
      queryClient.invalidateQueries({ queryKey: ['routines'], exact: true });
      navigate(AppRoutes.ROUTINES);
    },
    onError: () => {
      alert('Failed to save data');
    },
  });

  const { mutateAsync: createRoutineMutation } = useMutation({
    mutationFn: createRoutine,
    onSuccess: async (createdRoutine) => {
      await updateRoutineExercisesMutation({
        routineId: createdRoutine.id,
        exercises,
      });
      queryClient.invalidateQueries({ queryKey: ['routines'], exact: true });
      navigate(AppRoutes.ROUTINES);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: routine?.name,
      description: routine?.description,
    },
    resolver: yupResolver(routineValidationSchema),
  });

  return (
    <div className='routine-form-container'>
      <div className='routine-options-bar'>
        <IconButton aria-label='go back' onClick={goBackHandler}>
          <ArrowBackIosNewIcon sx={{ color: 'accent.main' }} />
        </IconButton>
        <div className='routine-options'>
          <Button
            type='submit'
            size='small'
            form='routine-form'
            isDisabled={isSubmitting}
            dataTestId='save-routine-button'
          >
            <SaveAsIcon fontSize='small' /> &nbsp; Save Routine
          </Button>
        </div>
      </div>
      <form id='routine-form' className='routine-form' onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label='Routine name'
          fullWidth
          size='small'
          className='form-field'
          variant='filled'
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label='Description'
          fullWidth
          multiline
          size='small'
          rows={4}
          className='form-field'
          variant='filled'
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
      </form>
      <div className='routine-exercise-list'>
        <Button onClick={handleClickOpen} dataTestId='add-exercise-button'>
          <AddIcon />
          &nbsp;ADD EXERCISE
        </Button>
        <ExerciseModal open={modalOpen} handleClose={handleClose} onSave={exerciseModalOnSaveHandler} />
        <ExercisesTable editable={true} />
      </div>
    </div>
  );
};

type RoutineProps = {
  routine?: Routine;
};

export default RoutineForm;
