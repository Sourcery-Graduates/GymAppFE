import { fetchExercisePagedByName } from '@/api/exerciseApi';
import { useQuery } from '@tanstack/react-query';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import ExerciseList from './exerciseList/ExerciseList';
import BasicSpinner from '../components/loaders/BasicSpinner';
import ErrorPage from '../errorPage/ErrorPage';
import './Exercises.scss';
import { debounce } from '../common/utils/debounce';
import TablePagination from '@mui/material/TablePagination/TablePagination';

const Exercises = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['exercises', searchValue, currentPage, rowsPerPage],
    queryFn: () => fetchExercisePagedByName(searchValue, currentPage, rowsPerPage),
  });

  const debouncedHandleSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, 300);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedHandleSearch(event);
  };

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  if (isLoading || !data) {
    return <BasicSpinner />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <div className='exercises'>
      <form className='exercises__search-bar'>
        <button className='exercises__search-bar--button'>
          <SearchIcon />
        </button>
        <input
          className='exercises__search-bar--field'
          type='search'
          placeholder='Search exercises...'
          onChange={handleSearch}
        />
      </form>
      <div className='exercises__list'>
        <ExerciseList exercises={data.data} />
      </div>
      <div className='exercises-pagination'>
        <TablePagination
          component='div'
          count={data.totalElements}
          page={currentPage}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[10, 25, 50, 100]}
          labelRowsPerPage='Rows:'
          className='exercisesPagination'
        />
      </div>
    </div>
  );
};

export default Exercises;
