import { WorkoutExerciseSet } from '@/types/entities/Workout';
import { ListItem } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

interface SetProps {
  set: WorkoutExerciseSet;
  setIndex: number;
  exerciseIndex: number;
  control: Control<any>;
  removeSet: (index: number) => void;
}

const Set = ({ set, setIndex, exerciseIndex, control }: SetProps) => {
  return (
    <ListItem
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      key={set.setNumber}
    >
      <span>{`${setIndex + 1}. `}</span>
      <Controller
        name={`exercises[${exerciseIndex}].sets[${setIndex}].reps`}
        control={control}
        render={({ field }) => <span>{`${field.value}reps x`}</span>}
      />

      <Controller
        name={`exercises[${exerciseIndex}].sets[${setIndex}].weight`}
        control={control}
        render={({ field }) => <span>{`${field.value}kg`}</span>}
      />

      <Controller
        name={`exercises[${exerciseIndex}].sets[${setIndex}].restTime`}
        control={control}
        render={({ field }) => <span>{`${field.value}s rest time`}</span>}
      />
    </ListItem>
  );
};

export default Set;
