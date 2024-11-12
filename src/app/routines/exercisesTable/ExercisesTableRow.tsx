import { TableRow, TableCell, Button, IconButton, Box, Collapse, Typography } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useRoutineExercises } from '@/app/common/context/RoutineExercisesContext';
import { RoutineExercise } from '@/types/entities/Routine';
import { fetchExerciseByName } from '@/api/exerciseApi';
export interface ExercisesTableRowProps {
  data: RoutineExercise;
  index: number;
  editable: boolean;
}

const ExercisesTableRow = ({ data, index, editable }: ExercisesTableRowProps) => {
  const [open, setOpen] = useState(false);

  const { removeExercise } = useRoutineExercises();

  const deleteRow = () => {
    setOpen(false);
    removeExercise(data.routineExerciseId);
  };

  const { data: exerciseDetails, isSuccess } = useQuery({
    queryKey: ['exerciseDetails', data.exercise.id],
    queryFn: () => fetchExerciseByName(data.exercise.name),
    enabled: open,
  });

  return (
    <>
      <TableRow key={data.routineExerciseId}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>
          {data.exercise.name}{' '}
          <IconButton aria-label='expand row' size='small' color='info' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp color='info' /> : <KeyboardArrowDown color='info' />}
          </IconButton>
        </TableCell>
        <TableCell>{data.defaultsSets}</TableCell>
        <TableCell>{data.defaultReps}</TableCell>
        <TableCell>{data.defaultWeight}</TableCell>
        <TableCell>{data.defaultRestTime}</TableCell>

        {editable && (
          <TableCell align='right'>
            <Button variant='outlined' size='small' color='error' onClick={deleteRow}>
              delete
            </Button>
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='subtitle1' gutterBottom component='div'>
                <b>Exercise Details</b>
              </Typography>
              {isSuccess && (
                <>
                  <Typography variant='body2' gutterBottom>
                    <strong>Force:</strong> {exerciseDetails[0].force}
                  </Typography>
                  <Typography variant='body2' gutterBottom>
                    <strong>Level:</strong> {exerciseDetails[0].level}
                  </Typography>
                  <Typography variant='body2' gutterBottom>
                    <strong>Mechanic:</strong> {exerciseDetails[0].mechanic}
                  </Typography>
                  <Typography variant='body2' gutterBottom>
                    <strong>Equipment:</strong> {exerciseDetails[0].equipment}
                  </Typography>
                  <Typography variant='body2' gutterBottom>
                    <strong>Primary Muscles:</strong> {exerciseDetails[0].primaryMuscles?.join(', ')}
                  </Typography>
                  {exerciseDetails[0].secondaryMuscles && exerciseDetails[0].secondaryMuscles.length > 0 && (
                    <Typography variant='body2' gutterBottom>
                      <strong>Secondary Muscles:</strong> {exerciseDetails[0].secondaryMuscles?.join(', ')}
                    </Typography>
                  )}
                  <hr />
                  <Typography variant='body2'>{exerciseDetails[0].description}</Typography>
                </>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ExercisesTableRow;
