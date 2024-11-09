import { CreteRoutineExerciseJoined } from '@/types/entities/Exercise';
import { TableRow, TableCell, Button, IconButton, Box, Collapse, Typography } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

import { useState } from 'react';
export interface ExercisesTableRowProps {
  data: CreteRoutineExerciseJoined;
  index: number;
}

const ExercisesTableRow = ({ data, index }: ExercisesTableRowProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow key={data.exerciseId}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>
          {data.exercise.name}{' '}
          <IconButton aria-label='expand row' size='small' color='info' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp color='info' /> : <KeyboardArrowDown color='info' />}
          </IconButton>
        </TableCell>
        <TableCell>{data.defaultSets}</TableCell>
        <TableCell>{data.defaultReps}</TableCell>
        <TableCell>{data.defaultWeight}</TableCell>
        <TableCell>{data.defaultRestTime}</TableCell>

        <TableCell align='right'>
          <Button variant='outlined' size='small' color='error'>
            delete
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='subtitle1' gutterBottom component='div'>
                <b>Exercise Details</b>
              </Typography>
              <Typography variant='body2' gutterBottom>
                <strong>Force:</strong> {data.exercise.force}
              </Typography>
              <Typography variant='body2' gutterBottom>
                <strong>Level:</strong> {data.exercise.level}
              </Typography>
              <Typography variant='body2' gutterBottom>
                <strong>Mechanic:</strong> {data.exercise.mechanic}
              </Typography>
              <Typography variant='body2' gutterBottom>
                <strong>Equipment:</strong> {data.exercise.equipment}
              </Typography>
              <Typography variant='body2' gutterBottom>
                <strong>Primary Muscles:</strong> {data.exercise.primaryMuscles?.join(', ')}
              </Typography>
              {data.exercise.secondaryMuscles && data.exercise.secondaryMuscles.length > 0 && (
                <Typography variant='body2' gutterBottom>
                  <strong>Secondary Muscles:</strong> {data.exercise.secondaryMuscles?.join(', ')}
                </Typography>
              )}
              <hr />
              <Typography variant='body2'>{data.exercise.description}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ExercisesTableRow;
