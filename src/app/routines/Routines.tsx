import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';

import Button from '../components/buttons/Button/Button';
import MyRoutines from './myRoutines/MyRoutines';
import PublicRoutines from './publicRoutines/PublicRoutines';

import './Routines.scss';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/types/routes';
import { debounce } from '@/app/common/utils/debounce.ts';

const MY_ROUTINES = 'my-routines';
const PUBLIC_ROUTINES = 'public-routines';

const Routines = () => {
  const [tabValue, setTabValue] = React.useState(MY_ROUTINES);
  const navigate = useNavigate();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState('');

  const scrollTop = () => {
    scrollRef.current?.scrollIntoView({ block: 'end' });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleOnClick = () => {
    navigate(AppRoutes.ROUTINE_CREATE);
  };

  const debouncedHandleSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    if (tabValue === MY_ROUTINES) {
      setTabValue(PUBLIC_ROUTINES);
    }
    setSearchValue(event.target.value);
  }, 300);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedHandleSearch(event);
  };

  return (
    <div className='routines-container' ref={scrollRef}>
      <div className='routines-top'>
        <form className='search-bar'>
          <button className='search-button'>
            <SearchIcon />
          </button>
          <input
            id='routines-search-field'
            className='search-field'
            type='search'
            placeholder='Search public routines...'
            onChange={handleSearch}
          />
        </form>
        <div className='routine-options'>
          <Button className='new-routine-btn' onClick={handleOnClick}>
            <AddIcon />
            &nbsp;NEW ROUTINE
          </Button>
        </div>
      </div>
      <div className='routines-filter-bar'>
        <div className='tabs-wrapper'>
          <Tabs value={tabValue} onChange={handleTabChange} textColor='inherit' indicatorColor='secondary'>
            <Tab value={MY_ROUTINES} label='My Routines' />
            <Tab value={PUBLIC_ROUTINES} label='Public Routines' />
          </Tabs>
        </div>
      </div>
      {tabValue === MY_ROUTINES && <MyRoutines />}
      {tabValue === PUBLIC_ROUTINES && <PublicRoutines scrollTop={scrollTop} searchValue={searchValue} />}
    </div>
  );
};

export default Routines;
