import SearchIcon from '@mui/icons-material/Search';
import ExerciseList from './exerciseList/ExerciseList';
import { useRef, useState } from 'react';
import debounce from '@mui/material/utils/debounce';
import './Exercises.scss';

const Exercises = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const debouncedHandleSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, 300);

  const scrollTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
          onChange={debouncedHandleSearch}
        />
      </form>
      <div className='exercises__list' ref={scrollRef}>
        <ExerciseList scrollTop={scrollTop} searchValue={searchValue} />
      </div>
    </div>
  );
};

export default Exercises;
