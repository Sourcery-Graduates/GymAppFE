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

const Routines = () => {
  const [tabValue, setTabValue] = React.useState('my-routines');
  const navigate = useNavigate();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollTop = () => {
    scrollRef.current?.scrollIntoView({ block: 'end' });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleOnClick = () => {
    navigate(AppRoutes.ROUTINE_CREATE);
  };

  return (
    <div className='routines-container' ref={scrollRef}>
      <div className='routines-top'>
        <form className='search-bar'>
          <button className='search-button'>
            <SearchIcon />
          </button>
          <input className='search-field' type='search' placeholder='Search routines...' onChange={() => {}} />
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
            <Tab value='my-routines' label='My Routines' />
            <Tab value='public-routines' label='Public Routines' />
          </Tabs>
        </div>
      </div>
      {tabValue === 'my-routines' && <MyRoutines />}
      {tabValue === 'public-routines' && <PublicRoutines scrollTop={scrollTop} />}
    </div>
  );
};

export default Routines;
