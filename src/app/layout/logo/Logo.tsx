import { useNavigate } from 'react-router-dom';
import './Logo.scss';
import cognizantLogo from '@/assets/CognizantLogo.png';
import { AppRoutes } from '@/types/routes';

const Logo = () => {
	const navigate = useNavigate();

	const onLogoClick = (): void => {
		navigate(AppRoutes.HOME);
	};

	return (
		<div onClick={onLogoClick} className='app_logo_container'>
			<img className='app_logo' src={cognizantLogo} />
		</div>
	);
};

export default Logo;
