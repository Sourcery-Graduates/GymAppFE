import SearchIcon from '@mui/icons-material/Search';
import ExerciseList from './exerciseList/ExerciseList';
import { useRef, useState } from 'react';
import debounce from '@mui/material/utils/debounce';
import './Exercises.scss';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { PrimaryMuscle } from '@/types/primaryMuscles';

const Exercises = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedPrimaryMuscle, setSelectedPrimaryMuscle] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const debouncedHandleSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, 300);

  const handlePrimaryMuscleChange = (event: SelectChangeEvent) => {
    setSelectedPrimaryMuscle(event.target.value);
  };

  //TODO: update scroll to top in both routines and exercises
  const scrollTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className='exercises'>
      <div className='exercises__top'>
        <form className='exercises__top--search-bar'>
          <button className='exercises__top--search-bar--button'>
            <SearchIcon />
          </button>
          <input
            id='exercises-search-field'
            className='exercises__top--search-bar--field'
            type='search'
            placeholder='Search exercises...'
            onChange={debouncedHandleSearch}
          />
        </form>
        <div className='exercises__top--multi-select'>
          <FormControl fullWidth>
            <InputLabel id=''>Muscle Group</InputLabel>
            <Select
              labelId='exercises-primary-muscle-select'
              id='exercises-primary-muscle-select'
              value={selectedPrimaryMuscle}
              label='Muscle Group'
              onChange={handlePrimaryMuscleChange}
              sx={{
                backgroundColor: '#282828',
                borderRadius: '8px',
                color: '#6c757d',
              }}
            >
              {Object.entries(PrimaryMuscle).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {value[0].toLocaleUpperCase() + value.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className='exercises__list' ref={scrollRef}>
        <ExerciseList scrollTop={scrollTop} searchValue={searchValue} primaryMuscle={selectedPrimaryMuscle} />
      </div>
    </div>
  );
};

export default Exercises;
