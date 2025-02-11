import { loginUser } from '@/api/authentication';
import useAuth from '@/app/common/hooks/useAuth';
import Button from '@/app/components/buttons/Button/Button';
import { LoginForm, loginValidationSchema } from '@/types/entities/Authentication';
import { yupResolver } from '@hookform/resolvers/yup';
import { AlertColor, IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import './LoginPage.scss';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { CurrentAuthenticationForm } from '@/app/pages/authenticationPage/AuthenticationPage';
import { AxiosError } from 'axios';
import Footer from '@/app/layout/notAuthenticatedLayout/footer/Footer';

interface LoginPageProps {
  setCurrentForm: React.Dispatch<React.SetStateAction<CurrentAuthenticationForm>>;
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackbarText: React.Dispatch<React.SetStateAction<string>>;
  setSnackbarSeverity: React.Dispatch<React.SetStateAction<AlertColor>>;
}

const LoginPage = ({ setCurrentForm, setSnackbarOpen, setSnackbarText, setSnackbarSeverity }: LoginPageProps) => {
  const { setIsLoggedIn } = useAuth();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onLogIn = async (data: LoginForm) => {
    loginUser(data.username, data.password, data.stayLoggedIn)
      .then(() => {
        setIsLoggedIn(true);
        reset();
      })
      .catch((error: AxiosError) => {
        setSnackbarOpen(true);
        if (error.status === 401) {
          setSnackbarText('E-mail or password was invalid');
        } else {
          setSnackbarText(error.response?.data?.message);
        }
        setSnackbarSeverity('error');
      });
  };

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      username: '',
      password: '',
      stayLoggedIn: false,
    },
    resolver: yupResolver(loginValidationSchema),
  });

  return (
    <>
      <div className='login_container'>
        <form className='login_form' onSubmit={handleSubmit(onLogIn)}>
          <h1 className='title'>Sign In</h1>
          <TextField
            label='E-mail'
            size='small'
            className='form-field'
            variant='filled'
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
            onBlur={() => clearErrors('username')}
          />
          <TextField
            label='Password'
            size='small'
            className='form-field'
            variant='filled'
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            onBlur={() => clearErrors('password')}
            type={showPassword ? 'text' : 'password'}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      className={'show-password-button'}
                      aria-label={showPassword ? 'hide the password' : 'display the password'}
                      onClick={handleClickShowPassword}
                      edge='end'
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <div className='form-field remember-me-box'>
            <label htmlFor='checkbox'>Remember me</label>
            <input id='checkbox' type='checkbox' className='remember-me' {...register('stayLoggedIn')} />
          </div>
          <Button type='submit'>Login</Button>
        </form>
        <div className='login_form_text'>
          <div>
            <p
              className='login_form_text_swap_form'
              onClick={() => setCurrentForm(CurrentAuthenticationForm.FORGOT_PASSWORD_FORM)}
            >
              Forgot your password?
            </p>
            <p
              className='login_form_text_swap_form'
              onClick={() => setCurrentForm(CurrentAuthenticationForm.REGISTER_FORM)}
            >
              Don't have an account? Register here!
            </p>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
