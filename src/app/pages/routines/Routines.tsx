import AddIcon from '@mui/icons-material/Add';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';

import MyRoutines from './myRoutines/MyRoutines';
import PublicRoutines from './publicRoutines/PublicRoutines';

import './Routines.scss';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/types/routes';
import { debounce } from '@/app/common/utils/debounce.ts';
import Button from '@/app/components/buttons/Button/Button';
import SearchTextField from '@/app/components/textfields/SearchTextField';

const MY_ROUTINES = 'my-routines';
const PUBLIC_ROUTINES = 'public-routines';

const Routines = () => {
  const [tabValue, setTabValue] = React.useState(MY_ROUTINES);
  const navigate = useNavigate();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState('');

  const scrollTop = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  return (
    <div className='routines-container' ref={scrollRef}>
      <div className='routines-top'>
        <div className='routines-top__search'>
          <SearchTextField handleSearch={debouncedHandleSearch} />
        </div>
        <div className='routine-options'>
          <Button className='new-routine-btn' onClick={handleOnClick} dataTestId='new-routine-button'>
            <AddIcon />
            &nbsp;NEW ROUTINE
          </Button>
        </div>
      </div>
      <div className='routines-filter-bar'>
        <div className='tabs-wrapper'>
          <Tabs value={tabValue} onChange={handleTabChange} textColor='inherit' indicatorColor='secondary'>
            <Tab value={MY_ROUTINES} label='My Routines' data-testid='my-routines'/>
            <Tab value={PUBLIC_ROUTINES} label='Public Routines' data-testid='public-routines'/>
          </Tabs>
        </div>
      </div>
      {tabValue === MY_ROUTINES && <MyRoutines />}
      {tabValue === PUBLIC_ROUTINES && <PublicRoutines scrollTop={scrollTop} searchValue={searchValue} />}
    </div>
  );
};

export default Routines;
