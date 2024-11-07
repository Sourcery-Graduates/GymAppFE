import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const mockExercises = [
  {
    id: 1,
    exerciseName: 'Bench Press',
    sets: 3,
    reps: 10,
    weight: 80,
    weightUnit: 'kg',
    restTime: 60,
    restTimeUnit: 'seconds',
  },
  {
    id: 2,
    exerciseName: 'Squat',
    sets: 4,
    reps: 12,
    weight: 100,
    weightUnit: 'kg',
    restTime: 90,
    restTimeUnit: 'seconds',
  },
  {
    id: 3,
    exerciseName: 'Deadlift',
    sets: 3,
    reps: 8,
    weight: 120,
    weightUnit: 'kg',
    restTime: 120,
    restTimeUnit: 'seconds',
  },
  {
    id: 4,
    exerciseName: 'Shoulder Press',
    sets: 4,
    reps: 10,
    weight: 40,
    weightUnit: 'kg',
    restTime: 45,
    restTimeUnit: 'seconds',
  },
  {
    id: 5,
    exerciseName: 'Bicep Curl',
    sets: 3,
    reps: 15,
    weight: 20,
    weightUnit: 'kg',
    restTime: 30,
    restTimeUnit: 'seconds',
  },
];

const ExercisesTable = () => {
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
            {mockExercises.map((exercise, index) => (
              <TableRow key={exercise.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{exercise.exerciseName}</TableCell>
                <TableCell>{exercise.sets}</TableCell>
                <TableCell>{exercise.reps}</TableCell>
                <TableCell>
                  {exercise.weight} {exercise.weightUnit}
                </TableCell>
                <TableCell>
                  {exercise.restTime} {exercise.restTimeUnit}
                </TableCell>
                <TableCell align='right'>Add options like Info or Delete here</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ExercisesTable;
