import { List } from '@mui/material';
import Button from '@/app/components/buttons/Button/Button';
import { WorkoutExerciseSet } from '@/types/entities/Workout';
import Set from './set/Set';

import EditibleSet from '@/app/myTraining/workout/workoutForm/exerciseCard/setList/set/EditibleSet';

interface setListProps {
  setFields: any; // Fields for the sets, passed from `useFieldArray`
  appendSet: any; // Function to append a new set
  removeSet: any; // Function to remove a set
  exerciseIndex: number;
  control: any; // control object from `useForm` hook
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const setList = ({ isEditing, setFields, appendSet, removeSet, exerciseIndex, control }: setListProps) => {
  const handleAddSet = () => {
    const lastSet = setFields[setFields.length - 1];

    appendSet({
      comment: '',
      id: '',
      reps: lastSet.reps,
      restTime: lastSet.restTime,
      setNumber: lastSet.setNumber + 1,
      weight: lastSet.weight,
    });
  };

  return (
    <>
      <List>
        {setFields.map((set, setIndex) =>
          isEditing ? (
            <EditibleSet
              set={set}
              setIndex={setIndex}
              exerciseIndex={exerciseIndex}
              control={control}
              removeSet={removeSet}
            />
          ) : (
            <Set set={set} setIndex={setIndex} exerciseIndex={exerciseIndex} control={control} removeSet={removeSet} />
          ),
        )}
      </List>
      {isEditing && (
        <>
          <Button onClick={handleAddSet}>Add new set</Button>
        </>
      )}
    </>
  );
};

export default setList;
