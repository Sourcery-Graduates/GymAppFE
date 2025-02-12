import './AuthenticatedLayout.scss';
import Logo from '@/app/layout/authenticatedLayout/logo/Logo';
import Footer from '@/app/layout/authenticatedLayout/footer/Footer';
import Navigation from '@/app/layout/authenticatedLayout/navigation/Navigation';
import TopSection from '@/app/layout/authenticatedLayout/topSection/TopSection';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { autoLogoutLocations } from '@/app/util/autoLogoutLocations';
import useAuth from '@/app/common/hooks/useAuth';

const AuthenticatedLayout = () => {
  const location = useLocation();
  const { logOutUser } = useAuth();

  useEffect(() => {
    if (autoLogoutLocations.includes(location.pathname)) {
      logOutUser();
    }
  }, []);

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

export default AuthenticatedLayout;
