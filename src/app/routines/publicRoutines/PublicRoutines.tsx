import './PublicRoutines.scss';
import { useQuery } from '@tanstack/react-query';
import { fetchAllPublicRoutines } from '@/api/routineApi';
import BasicSpinner from '@/app/components/loaders/BasicSpinner';
import RoutineListItem from './routineListItem/RoutineListItem';
import React, { useEffect, useState } from 'react';
import { PagedRoutine } from '@/types/entities/Routine';
import { TablePagination } from '@mui/material';

interface PublicRoutinesProps {
  scrollTop: () => void;
  searchValue: string;
}

const PublicRoutines = ({ scrollTop, searchValue }: PublicRoutinesProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {
    data: data,
    isLoading,
    error,
  } = useQuery<PagedRoutine>({
    queryFn: () => fetchAllPublicRoutines(currentPage, rowsPerPage, searchValue),
    queryKey: ['public-routines', currentPage, rowsPerPage, searchValue],
  });

  useEffect(() => {
    scrollTop();
  }, [currentPage, rowsPerPage, scrollTop]);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchValue]);

  if (isLoading) {
    return <BasicSpinner />;
  }
  if (error) {
    //TODO: add app alerts
  }
  const { data: routines, totalElements } = data || {};

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <>
      <div className='public-routines'>
        <div className='public-routines__list'>
            {routines && routines.map((routine) => <RoutineListItem key={routine.id} routine={routine} />)}
            <div className='public-routines__list--pagination'>
              <TablePagination
                component='div'
                count={totalElements || 0}
                page={currentPage}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPageOptions={[10, 25, 50, 100]}
                labelRowsPerPage='Rows:'
                className='customTablePagination'
              />
            </div>
        </div>
      </div>
    </>
  );
};

export default PublicRoutines;
