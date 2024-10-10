import './Layout.scss';
import Logo from '@/app/layout/logo/Logo';
import Footer from '@/app/layout/footer/Footer';
import Navigation from '@/app/layout/navigation/Navigation';
import TopSection from '@/app/layout/topSection/TopSection';
import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<>
			<div className='layout'>
				<div className='layout_logo'>
					<Logo />
				</div>
				<div className='layout_navigation'>
					<Navigation />
				</div>
				<div className='layout_topSection'>
					<TopSection />
				</div>
				<div className='layout_outlet'>
					<Outlet />
				</div>
				<div className='layout_footer'>
					<Footer />
				</div>
			</div>
		</>
	);
};

export default Layout;
