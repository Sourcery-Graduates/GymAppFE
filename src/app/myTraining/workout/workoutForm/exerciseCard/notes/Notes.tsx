import { TextField } from '@mui/material';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

interface NotesProps {
  control: any;
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
            <div style={{ cursor: 'pointer' }} onClick={onNotesClick}>
              {visibleNotes ? <div>- Notes: {field.value}</div> : <div>+ Notes</div>}
            </div>
          )
        }
      />
    </>
  );
};

export default Notes;
