import AddIcon from '@mui/icons-material/Add';
import { List } from '@mui/material';
import Button from '@/app/components/buttons/Button/Button';
import Set from './set/Set';

import EditibleSet from '@/app/myTraining/workout/workoutForm/exerciseCard/setList/set/EditibleSet';
import { Control, UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form';
import { temporaryUUID } from '@/types/uuid';

interface setListProps {
  setFields: any;
  appendSet: UseFieldArrayAppend<any, `exercises[${number}].sets`>;
  removeSet: UseFieldArrayRemove;
  exerciseIndex: number;
  control: Control<any>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const setList = ({ isEditing, setFields, appendSet, removeSet, exerciseIndex, control }: setListProps) => {
  const handleAddSet = () => {
    const lastSet = setFields[setFields.length - 1];

    appendSet({
      comment: '',
      id: temporaryUUID(),
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
          <Button size='small' onClick={handleAddSet}>
            <AddIcon fontSize='small' /> NEW SET
          </Button>
        </>
      )}
    </>
  );
};

export default setList;
