import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import ExercisesTableRow from './ExercisesTableRow';
import { useRoutineExercises } from '@/app/common/context/RoutineExercisesContext';
import { timeUnits, weightUnits } from '../exersiceModal/measurementUnits';


interface ExerciseTableProps {
  editable: boolean;
}

const ExercisesTable = ({ editable = true }: ExerciseTableProps) => {
  const { exercises } = useRoutineExercises();
  console.log(exercises);
  return (
    <>
      <TableContainer>
        <Table aria-label='exercise table'>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Exercise Name</TableCell>
              <TableCell>Sets</TableCell>
              <TableCell>Reps</TableCell>
              <TableCell>Weight&nbsp;({weightUnits[0]})</TableCell>
              <TableCell>Rest Time&nbsp;({timeUnits[0]})</TableCell>
              {editable && <TableCell align='right'>Options</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {exercises.map((exercise, index) => (
              <ExercisesTableRow data={exercise} index={index} editable={editable} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ExercisesTable;
