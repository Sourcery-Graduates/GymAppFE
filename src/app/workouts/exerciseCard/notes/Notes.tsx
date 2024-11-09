import { useState } from 'react';

interface NotesProps {
  notes?: string;
}

const Notes = ({ notes }: NotesProps) => {
  const [visibleNotes, setVisibleNotes] = useState<boolean>(false);

  const onNotesClick = () => {
    setVisibleNotes((visibleNotes) => !visibleNotes);
  };

  if (!notes) {
    return <div>No notes</div>;
  }

  return (
    <div style={{ cursor: 'pointer' }} onClick={onNotesClick}>
      {visibleNotes ? <div>- Notes: {notes}</div> : <div>+ Notes</div>}
    </div>
  );
};

export default Notes;
