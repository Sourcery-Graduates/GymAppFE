import { WorkoutExerciseSet } from '@/types/entities/Workout';
import { ListItem } from '@mui/material';

interface SetProps {
  set: WorkoutExerciseSet;
  setIndex: number;
}

const Set = ({ set, setIndex }: SetProps) => {
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
      <span>{`${setIndex + 1}. ${set.reps}reps x ${set.weight}kg`}</span>
      <span>{`${set.restTime}s rest time`}</span>
    </ListItem>
  );
};

export default Set;
