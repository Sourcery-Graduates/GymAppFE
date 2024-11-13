import { TextField } from '@mui/material';
import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import './Notes.scss';

interface NotesProps {
  control: Control<any>;
  isEditing: boolean;
  exerciseIndex: number;
}

const Notes = ({ isEditing, control, exerciseIndex }: NotesProps) => {
  const [visibleNotes, setVisibleNotes] = useState<boolean>(false);

  const onNotesClick = () => {
    setVisibleNotes((visibleNotes) => !visibleNotes);
  };

  return (
    <>
      <Controller
        name={`exercises[${exerciseIndex}].notes`}
        control={control}
        render={({ field }) =>
          isEditing ? (
            <TextField fullWidth multiline maxRows={6} {...field} label='Notes' />
          ) : (
            <div className='notes' onClick={onNotesClick}>
              {visibleNotes ? <div>- Notes: {field.value}</div> : <div>+ Notes</div>}
            </div>
          )
        }
      />
    </>
  );
};

export default Notes;
