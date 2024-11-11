import './ExerciseModal.scss';
import { fetchExerciseByName } from '@/api/exerciseApi';
import { CreateRoutineExercise, CreteRoutineExerciseJoined, ExerciseDetails } from '@/types/entities/Exercise';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { validationSchema } from './validationSchema';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { debounce } from '@/app/common/utils/debounce';
import { timeUnits, weightUnits } from './measurementUnits';
import { useRoutineExercises } from '@/app/common/context/RoutineExercisesContext';

interface ExerciseModalProps {
  open: boolean;
  handleClose: () => void;
}

const ExerciseModal = ({ open, handleClose }: ExerciseModalProps) => {
  const [prefix, setPrefix] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<ExerciseDetails | null>(null);

  const { addExercise } = useRoutineExercises();

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
      defaultRestTime: undefined,
      notes: '',
    },
  });

  const onSubmit = (data: CreateRoutineExercise) => {
    if (selectedExercise) {
      const exerciseData: CreteRoutineExerciseJoined = {
        ...data,
        exerciseId: selectedExercise.id,
        exercise: selectedExercise,
      };
      addExercise(exerciseData);
      reset();
      handleClose();
    }
  };

  const onClose = () => {
    reset();
    handleClose();
  };

  const handleInputChange = debounce((_, value: string) => {
    setPrefix(value);
  }, 250);

  const { data: exerciseOptions } = useQuery({
    queryKey: ['exerciseOptions', prefix],
    queryFn: () => fetchExerciseByName(prefix),
    enabled: !!prefix,
  });

  return (
    <Dialog onClose={handleClose} open={open} className='exercise-modal-dialog'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add exercise</DialogTitle>
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
                  onInputChange={handleInputChange}
                  onChange={(_, newValue) => {
                    field.onChange(newValue ? newValue.id : '');
                    setSelectedExercise(newValue || null);
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
              label='Sets'
              {...register('defaultSets')}
              error={!!errors.defaultSets}
              helperText={errors.defaultSets?.message}
            />
            <TextField
              label='Reps'
              {...register('defaultReps')}
              error={!!errors.defaultReps}
              helperText={errors.defaultReps?.message}
            />
          </div>
          <div className='form-row'>
            <TextField
              label='Weight'
              {...register('defaultWeight')}
              error={!!errors.defaultWeight}
              helperText={errors.defaultWeight?.message}
            />
            <Controller
              name='weightUnit'
              control={control}
              render={({ field }) => (
                <FormControl variant='filled'>
                  <InputLabel>Weight Unit</InputLabel>
                  <Select {...field} label='Weight Unit' error={!!errors.weightUnit}>
                    {weightUnits.map((unit) => (
                      <MenuItem key={unit} value={unit}>
                        {unit}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </div>
          <div className='form-row'>
            <TextField
              label='Rest time'
              {...register('defaultRestTime')}
              error={!!errors.defaultRestTime}
              helperText={errors.defaultRestTime?.message}
            />
            <Controller
              name='restTimeUnit'
              control={control}
              render={({ field }) => (
                <FormControl variant='filled'>
                  <InputLabel>Time Unit</InputLabel>
                  <Select {...field} label='Time Unit' error={!!errors.restTimeUnit}>
                    {timeUnits.map((unit) => (
                      <MenuItem key={unit} value={unit}>
                        {unit}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
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
