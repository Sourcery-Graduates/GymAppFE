import { fetchExerciseByName } from '@/api/exerciseApi';
import { ExerciseDetails } from '@/types/entities/Exercise';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';

interface ExerciseModalProps {
  open: boolean;
  handleClose: () => void;
}

const ExerciseModal = ({ open, handleClose }: ExerciseModalProps) => {
  const [exerciseOptions, setExerciseOptions] = useState<ExerciseDetails[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseDetails | null>(null);

  useEffect(() => {
    // Fetch mock data on component mount
    const fetchData = async () => {
      try {
        const data = await fetchExerciseByName();
        setExerciseOptions(data);
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
      }
    };
    fetchData();
  }, []);

  const handleExerciseChange = (event: unknown, newValue: ExerciseDetails | null) => {
    setSelectedExercise(newValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        '& .MuiPaper-root': {
          color: 'text.primary',
          backgroundColor: 'primary.main',
          borderRadius: '8px',
          border: 1,
          borderColor: 'secondary.main',

          '& .MuiTypography-root': {
            color: 'text.primary',
          },
        },
      }}
    >
      <form>
      <DialogTitle>Add exercise</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add an exercise to the routine, please enter the specified parameters below. We have an extensive database
          of over 800 exercises, that will satisfy your needs.
        </DialogContentText>
        <DialogContent>
        
            <Autocomplete
          disablePortal
          options={exerciseOptions}
          value={selectedExercise}
          onChange={handleExerciseChange}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label='Exercise' sx={{ width: 300 }} />}
        />          
        </DialogContent>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' color='error' onClick={handleClose}>
          Cancel
        </Button>
        <Button variant='outlined' color='info'>
          Save
        </Button>
      </DialogActions>
      </form>
    </Dialog>
  );
};

export default ExerciseModal;
