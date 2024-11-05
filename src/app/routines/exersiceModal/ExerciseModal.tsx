import './ExerciseModal.scss';
import { fetchExerciseByName } from '@/api/exerciseApi';
import { CreateRoutineExercise } from '@/types/entities/Exercise';
import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { validationSchema } from './validationSchema';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

interface ExerciseModalProps {
  open: boolean;
  handleClose: () => void;
}

const ExerciseModal = ({ open, handleClose }: ExerciseModalProps) => {
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
      defaultSets: undefined,
      defaultReps: undefined,
      defaultWeight: undefined,
      defaultRestTime: '',
      notes: '',
    },
  });

  const onSubmit = (data: CreateRoutineExercise) => {
    console.log(data); // Handle form submission
    reset();
    handleClose();
  };

  const onClose = () => {
    reset();
    handleClose();
  };

  const { data: exerciseOptions } = useQuery({
    queryFn: async () => fetchExerciseByName(),
    queryKey: ['exerciseOptions'],
  });

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
          <DialogContent>
            <div className='form-row'>
              <Controller
                name='exerciseId'
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    disablePortal
                    fullWidth
                    options={exerciseOptions || []}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(_, newValue) => {
                      field.onChange(newValue ? newValue.id : '');
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Choose exercise'
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
                helperText={errors.defaultSets ? 'Default sets must be > 0' : ''}
              />
              <TextField
                label='Default reps'
                {...register('defaultReps')}
                error={!!errors.defaultReps}
                helperText={errors.defaultReps ? 'Default reps must be > 0' : ''}
              />
            </div>
            <div className='form-row'>
              <TextField
                label='Default weight'
                {...register('defaultWeight')}
                error={!!errors.defaultWeight}
                helperText={errors.defaultWeight ? 'Default weight must be > 0' : ''}
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
                label='Notes'
                {...register('notes')}
                error={!!errors.notes}
                helperText={errors.notes?.message}
              />
            </div>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='error' onClick={onClose}>
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
