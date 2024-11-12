import { WorkoutExerciseSet } from '@/types/entities/Workout';
import { InputAdornment, ListItem, TextField, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller } from 'react-hook-form';

interface EditibleSetProps {
  set: WorkoutExerciseSet;
  setIndex: number;
  exerciseIndex: number;
  control: any;
  removeSet: (index: number) => void;
}

const EditibleSet = ({ set, setIndex, exerciseIndex, control, removeSet }: EditibleSetProps) => {
  return (
    <ListItem key={set.setNumber}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
        <div>{`${setIndex + 1}. `}</div>

        <Controller
          name={`exercises[${exerciseIndex}].sets[${setIndex}].reps`}
          control={control}
          render={({ field }) => <TextField {...field} sx={{ width: '50px' }} label='reps' />}
        />
        <Controller
          name={`exercises[${exerciseIndex}].sets[${setIndex}].weight`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ width: '80px', textAlign: 'right' }}
              label='weight'
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment className='helper-text' position='end' style={{ color: '#6c757d' }}>
                      <span className='helper-text'>kg</span>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />
        <span>x</span>
        <Controller
          name={`exercises[${exerciseIndex}].sets[${setIndex}].restTime`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ width: '90px' }}
              label='rest time'
              defaultValue={set.restTime}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <span className='helper-text'>s</span>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />
        {/* <Controller
        name={`exercises[${exerciseIndex}].sets[${setIndex}].comment`}
        control={control}
        render={({ field }) => <input {...field} placeholder="Set Comment" />}
      /> */}
        {setIndex !== 0 && (
          <Tooltip title='Delete'>
            <CloseIcon style={{ cursor: 'pointer' }} onClick={() => removeSet(setIndex)} />
          </Tooltip>
        )}
      </div>
    </ListItem>
  );
};

export default EditibleSet;
