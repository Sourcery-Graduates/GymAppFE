import { WorkoutExerciseSet } from '@/types/entities/Workout';
import { InputAdornment, ListItem, TextField, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface EditibleSetProps {
  set: WorkoutExerciseSet;
  setIndex: number;
  handleDeleteSet: (setNumber: number) => void;
}

const EditibleSet = ({ set, setIndex, handleDeleteSet }: EditibleSetProps) => {
  return (
    <ListItem key={set.setNumber}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
        <div>{`${setIndex + 1}. `}</div>
        <TextField sx={{ width: '50px' }} label='reps' defaultValue={set.reps} />
        <span>x</span>
        <TextField
          sx={{ width: '80px', textAlign: 'right' }}
          label='weight'
          defaultValue={set.weight}
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
        <TextField
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
        {setIndex !== 0 && (
          <Tooltip title='Delete'>
            <CloseIcon style={{ cursor: 'pointer' }} onClick={() => handleDeleteSet(set.setNumber)} />
          </Tooltip>
        )}
      </div>
    </ListItem>
  );
};

export default EditibleSet;
