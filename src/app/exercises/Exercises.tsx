import ExerciseList from './exerciseList/ExerciseList';
import { useRef, useState } from 'react';
import debounce from '@mui/material/utils/debounce';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { PrimaryMuscle } from '@/types/primaryMuscles';
import SearchTextField from '../components/textfields/SearchTextField';
import './Exercises.scss';

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
        <div className='exercises__top--search'>
          <SearchTextField handleSearch={debouncedHandleSearch} />
        </div>
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
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 250, // maksymalna wysokość rozwijanego menu
                  },
                },
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
