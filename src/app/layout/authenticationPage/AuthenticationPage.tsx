import './AuthenticationPage.scss';
import RegisterPage from '@/app/layout/authenticationPage/registerPage/RegisterPage';
import { useState } from 'react';
import LoginPage from '@/app/layout/authenticationPage/loginPage/LoginPage';

const AuthenticationPage = () => {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);

  return (
    <div className='authentication_background'>
      <div className='authentication_container'>
        {isLoginForm ? <LoginPage setIsLoginForm={setIsLoginForm} /> : <RegisterPage setIsLoginForm={setIsLoginForm} />}
      </div>
    </div>
  );
};

export default AuthenticationPage;
