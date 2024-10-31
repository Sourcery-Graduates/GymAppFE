import './ExerciseModal.scss';
import { fetchExerciseByName } from '@/api/exerciseApi';
import { CreateRoutineExercise, ExerciseDetails } from '@/types/entities/Exercise';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { validationSchema } from './validationSchema';
import { Controller, useForm } from 'react-hook-form';

interface ExerciseModalProps {
  open: boolean;
  handleClose: () => void;
}

const ExerciseModal = ({ open, handleClose }: ExerciseModalProps) => {
  const [exerciseOptions, setExerciseOptions] = useState<ExerciseDetails[]>([]);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      exerciseId: '',
      defaultSets: 0,
      defaultReps: 0,
      defaultWeight: 0,
      defaultRestTime: '',
      notes: '',
    },
  });

  const onSubmit = (data: CreateRoutineExercise) => {
    console.log(data); // Handle form submission
    reset();
    handleClose();
  };

  useEffect(() => {
    // Fetch mock data on component mount
    const fetchData = async () => {
      try {
        const data = await fetchExerciseByName();
        setExerciseOptions(data);
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        '& .MuiPaper-root': {
          color: 'text.primary',
          backgroundColor: 'primary.main',
          borderRadius: '8px',
          border: 1,
          borderColor: 'secondary.main',

          '& .MuiTypography-root': {
            color: 'text.primary',
          },
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add exercise</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add an exercise to the routine, please enter the specified parameters below. We have an extensive
            database of over 800 exercises, that will satisfy your needs.
          </DialogContentText>
          <DialogContent>
            <div className='form-row'>
              <Controller
                name='exerciseId'
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    disablePortal
                    fullWidth
                    options={exerciseOptions}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(_, newValue) => {
                      field.onChange(newValue ? newValue.id : '');
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Exercise name'
                        error={!!errors.exerciseId}
                        helperText={errors.exerciseId ? errors.exerciseId.message : ''}
                      />
                    )}
                  />
                )}
              />
            </div>
            <div className='form-row'>
              <TextField
                label='Default sets'
                {...register('defaultSets')}
                error={!!errors.defaultSets}
                helperText={errors.defaultSets?.message}
              />
              <TextField
                label='Default reps'
                {...register('defaultReps')}
                error={!!errors.defaultReps}
                helperText={errors.defaultReps?.message}
              />
            </div>
            <div className='form-row'>
              <TextField
                label='Default weight'
                {...register('defaultWeight')}
                error={!!errors.defaultWeight}
                helperText={errors.defaultWeight?.message}
              />
              <TextField
                label='Default rest time'
                {...register('defaultRestTime')}
                error={!!errors.defaultRestTime}
                helperText={errors.defaultRestTime?.message}
              />
            </div>
            <div className='form-row'>
              <TextField
                fullWidth
                multiline
                rows={2}
                label='Optional description'
                {...register('notes')}
                error={!!errors.notes}
                helperText={errors.notes?.message}
              />
            </div>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='error' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='outlined' color='info' type='submit'>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ExerciseModal;
