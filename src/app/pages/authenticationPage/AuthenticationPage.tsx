import './AuthenticationPage.scss';
import { useState } from 'react';
import LoginPage from '@/app/pages/authenticationPage/loginPage/LoginPage';
import RegisterPage from '@/app/pages/authenticationPage/registerPage/RegisterPage';
import ForgotPasswordPage from '@/app/pages/authenticationPage/forgotPasswordPage/ForgotPasswordPage';
import AppAlert from '@/app/components/alerts/AppAlert';
import { AlertColor } from '@mui/material';

export enum CurrentAuthenticationForm {
  LOGIN_FORM = 'LOGIN_FORM',
  REGISTER_FORM = 'REGISTER_FORM',
  FORGOT_PASSWORD_FORM = 'FORGOT_PASSWORD_FORM',
}

const AuthenticationPage = () => {
  const [currentForm, setCurrentForm] = useState<CurrentAuthenticationForm>(CurrentAuthenticationForm.LOGIN_FORM);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('info');

  const handleSnackbarClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason && reason !== 'timeout') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className='authentication_form'>
      {currentForm === CurrentAuthenticationForm.LOGIN_FORM && (
        <LoginPage />
      )}
      {currentForm === CurrentAuthenticationForm.REGISTER_FORM && (
        <RegisterPage
          setSnackbarOpen={setSnackbarOpen}
          setSnackbarText={setSnackbarText}
          setSnackbarSeverity={setSnackbarSeverity}
          setCurrentForm={setCurrentForm}
        />
      )}
      {currentForm === CurrentAuthenticationForm.FORGOT_PASSWORD_FORM && (
        <ForgotPasswordPage
          setSnackbarOpen={setSnackbarOpen}
          setSnackbarText={setSnackbarText}
          setSnackbarSeverity={setSnackbarSeverity}
          setCurrentForm={setCurrentForm}
        />
      )}
      <AppAlert open={snackbarOpen} onClose={handleSnackbarClose} text={snackbarText} severity={snackbarSeverity} />
    </div>
  );
};

export default AuthenticationPage;
