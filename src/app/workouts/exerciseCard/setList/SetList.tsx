import { List } from '@mui/material';
import Button from '@/app/components/buttons/Button/Button';
import { WorkoutExerciseSet } from '@/types/entities/Workout';
import Set from './set/Set';

import EditibleSet from '@/app/workouts/exerciseCard/setList/set/EditibleSet';

interface setListProps {
  sets: WorkoutExerciseSet[];
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteSet: (setNumber: number) => void;
  handleAddNewSet: (newSet: WorkoutExerciseSet) => void;
}

const setList = ({ isEditing, setIsEditing, sets, handleDeleteSet, handleAddNewSet }: setListProps) => {
  const handleStopEdit = () => {
    setIsEditing(false);
  };

  return (
    <>
      <List>
        {sets.map((set, setIndex) =>
          isEditing ? (
            <EditibleSet set={set} handleDeleteSet={(setNumber) => handleDeleteSet(setNumber)} setIndex={setIndex} />
          ) : (
            <Set set={set} setIndex={setIndex} />
          ),
        )}
      </List>
      {isEditing && (
        <>
          <Button onClick={() => handleAddNewSet(sets[sets.length - 1])}>Add new set</Button>
          <Button onClick={handleStopEdit}>Stop editing</Button>
        </>
      )}
    </>
  );
};

export default setList;
