import { createRoutine, updateRoutine } from '@/api/routineApi';
import Button from '@/app/components/buttons/Button/Button';
import { Routine } from '@/types/entities/Routine';
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
import ExerciseModal from '../exersiceModal/ExerciseModal';
import ExercisesTable from '../exercisesTable/ExercisesTable';

type FormFields = InferType<typeof routineValidationSchema>;

const RoutineForm: React.FC<RoutineProps> = ({ routine }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const goBackHandler = () => {
    navigate(-1);
  };

  const { mutateAsync: updateRoutineMutation } = useMutation({
    mutationFn: updateRoutine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'], exact: true });
      navigate(AppRoutes.ROUTINES);
    },
    onError: () => {
      alert('Failed to save data');
    },
  });

  const { mutateAsync: createRoutineMutation } = useMutation({
    mutationFn: createRoutine,
    onSuccess: () => {
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
          <Button size='small' form='routine-form' isDisabled={isSubmitting}>
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
      <div className='routine-exercise-list'>LIST OF EXERCISES</div>
      <Button onClick={handleClickOpen}>
        <AddIcon />
        &nbsp;ADD EXERCISE
      </Button>
      <ExerciseModal open={modalOpen} handleClose={handleClose} />
      <ExercisesTable />
    </div>
  );
};

type RoutineProps = {
  routine?: Routine;
};

export default RoutineForm;
