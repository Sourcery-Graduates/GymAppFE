import NavigationItem from '@/app/layout/authenticatedLayout/navigation/navigationItem/NavigationItem';
import { AppRoutes } from '@/types/routes';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import './Navigation.scss';

const Navigation = () => {
  return (
    <nav className='navigation'>
      <NavigationItem navigateTo={AppRoutes.HOME} description={'Home'}>
        <HomeIcon />
      </NavigationItem>
      <NavigationItem navigateTo={AppRoutes.ROUTINES} description={'Routines'}>
        <BorderColorIcon />
      </NavigationItem>
      <NavigationItem navigateTo={AppRoutes.MY_TRAINING} description={'My trainings'}>
        <FitnessCenterIcon />
      </NavigationItem>
      <NavigationItem navigateTo={AppRoutes.EXERCISES} description='Exercises'>
        <ManageSearchIcon fontSize='large' />
      </NavigationItem>
      <NavigationItem className='navigaton_options' navigateTo={AppRoutes.OPTIONS} description={'Options'}>
        <SettingsIcon />
      </NavigationItem>
    </nav>
  );
};

export default Navigation;
