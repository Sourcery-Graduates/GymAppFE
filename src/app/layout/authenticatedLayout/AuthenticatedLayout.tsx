import './AuthenticatedLayout.scss';
import Logo from '@/app/layout/authenticatedLayout/logo/Logo';
import Footer from '@/app/layout/authenticatedLayout/footer/Footer';
import Navigation from '@/app/layout/authenticatedLayout/navigation/Navigation';
import TopSection from '@/app/layout/authenticatedLayout/topSection/TopSection';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { autoLogoutLocations } from '@/app/util/autoLogoutLocations';
import useAuth from '@/app/common/hooks/useAuth.ts';
import { AppRoutes } from '@/types/routes.ts';

const AuthenticatedLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logOutLocally } = useAuth();

  const hasConfirmed = useRef(false);

  useEffect(() => {
    if (autoLogoutLocations.includes(location.pathname) && !hasConfirmed.current) {
      hasConfirmed.current = true;

      const confirmLogout = window.confirm(
        "This page requires you to be logged out. Would you like to proceed? " +
        "(You'll need to log in again afterward)"
      );

      if (confirmLogout) {
        logOutLocally();
      } else {
        navigate(AppRoutes.HOME);
      }

      setTimeout(() => {
        hasConfirmed.current = false;
      }, 1000);
    }
  }, [location.pathname]);

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
