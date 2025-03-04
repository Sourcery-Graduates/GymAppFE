import './NotAutnenticatedLayout.scss';
import Logo from '@/app/layout/authenticatedLayout/logo/Logo';
import { Outlet } from 'react-router-dom';

const NotAuthenticatedLayout = () => {
  return (
    <div className='not_auth_layout_background'>
      <div className='not_auth_layout_sideBar'>
        <div className='not_auth_layout_logo'>
          <Logo />
        </div>
      </div>
      <div className='not_auth_layout_container'>
        <Outlet />
      </div>
    </div>
  );
};

export default NotAuthenticatedLayout;
