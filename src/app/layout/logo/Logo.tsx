import './Logo.scss';
import cognizantLogo from '@/assets/cognizantLogo.jpeg';

const Logo = () => {
	return (
		<div className='app_logo_container'>
			<img className='app_logo' src={cognizantLogo} />
		</div>
	);
};

export default Logo;
