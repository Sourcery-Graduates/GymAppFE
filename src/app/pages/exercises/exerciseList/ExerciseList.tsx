import { ExerciseDetailsPage } from '@/types/entities/Exercise';
import React, { useEffect, useState } from 'react';
import ExerciseListItem from './exerciseListItem/ExerciseListItem';
import './ExerciseList.scss';
import TablePagination from '@mui/material/TablePagination/TablePagination';
import { useQuery } from '@tanstack/react-query';
import { fetchExercisePagedByPrimaryMuscleAndPrefix } from '@/api/exerciseApi';
import BasicSpinner from '@/app/components/loaders/BasicSpinner';
import ErrorPage from '@/app/pages/errorPage/ErrorPage';

interface ExerciseListProps {
  searchValue: string;
  primaryMuscle: string;
  scrollTop: () => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({ scrollTop, searchValue, primaryMuscle }) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data, isLoading, isError } = useQuery<ExerciseDetailsPage>({
    queryKey: ['exercises', searchValue, primaryMuscle, currentPage, rowsPerPage],
    queryFn: () => fetchExercisePagedByPrimaryMuscleAndPrefix(searchValue, primaryMuscle, currentPage, rowsPerPage),
  });

  useEffect(() => {
    setCurrentPage(0);
  }, [searchValue]);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  useEffect(() => {
    scrollTop();
  }, [currentPage, rowsPerPage, scrollTop]);

  if (isLoading || !data) {
    return <BasicSpinner />;
  }

  if (isError) {
    return <ErrorPage />;
  }
  return (
    <div className='exercise-list'>
      <div className='exercise-list__content'>
        {data.data.map((exercise) => (
          <ExerciseListItem exercise={exercise} key={exercise.id} />
        ))}
      </div>
      <div className='exercise-list__pagination'>
        <TablePagination
          component='div'
          count={data.totalElements}
          page={currentPage}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[10, 25, 50, 100]}
          labelRowsPerPage='Rows:'
          className='exercisePagination'
        />
      </div>
    </div>
  );
};

export default ExerciseList;
