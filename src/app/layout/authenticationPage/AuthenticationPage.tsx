import './AuthenticationPage.scss';
import { useState } from 'react';
import LoginPage from '@/app/layout/authenticationPage/loginPage/LoginPage';
import Logo from '@/app/layout/logo/Logo';
import RegisterPage from '@/app/layout/authenticationPage/registerPage/RegisterPage';

const AuthenticationPage = () => {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);

  return (
    <div className='authentication_background'>
      <div className='authentication_sideBar'>
        <div className='authentication_logo'>
          <Logo />
        </div>
      </div>
      <div className='authentication_container'>
        <div className='authentication_login'>
          {isLoginForm ? (
            <LoginPage setIsLoginForm={setIsLoginForm} />
          ) : (
            <RegisterPage setIsLoginForm={setIsLoginForm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
