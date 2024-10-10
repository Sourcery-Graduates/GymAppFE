import './Navigation.scss';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import NavigationItem from '@/app/layout/navigation/navigationItem/NavigationItem';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { AppRoutes } from '@/types/routes';

const Navigation = () => {
	return (
		<nav className='navigation'>
			<NavigationItem navigateTo={AppRoutes.HOME} description={'Home'}>
				<HomeIcon />
			</NavigationItem>
			<NavigationItem navigateTo={AppRoutes.TRAINING} description={'Trainings'}>
				<BorderColorIcon />
			</NavigationItem>
			<NavigationItem navigateTo={AppRoutes.MY_TRAINING} description={'My trainings'}>
				<FitnessCenterIcon />
			</NavigationItem>
			<NavigationItem className='navigaton_options' navigateTo={AppRoutes.OPTIONS} description={'Options'}>
				<SettingsIcon />
			</NavigationItem>
		</nav>
	);
};

export default Navigation;
