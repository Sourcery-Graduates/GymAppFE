import { useEffect } from 'react';
import useAuth from '@/app/common/hooks/useAuth.ts';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/types/routes.ts';

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(AppRoutes.HOME);
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      if (!code) {
        login();
      }
    }
  }, [isAuthenticated, navigate, login]);

  return <div className='login_page'></div>;
};

export default LoginPage;
