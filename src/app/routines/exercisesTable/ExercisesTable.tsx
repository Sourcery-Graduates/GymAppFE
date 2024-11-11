import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import ExercisesTableRow from './ExercisesTableRow';
import { useRoutineExercises } from '@/app/common/context/RoutineExercisesContext';

const ExercisesTable = () => {
  const { exercises } = useRoutineExercises();

  return (
    <>
      <TableContainer>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Exercise Name</TableCell>
              <TableCell>Sets</TableCell>
              <TableCell>Reps</TableCell>
              <TableCell>Weight&nbsp;(unit)</TableCell>
              <TableCell> Rest Time&nbsp;(unit)</TableCell>
              <TableCell align='right'>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exercises.map((exercise, index) => (
              <ExercisesTableRow data={exercise} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ExercisesTable;
