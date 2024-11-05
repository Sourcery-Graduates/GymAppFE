import { loginUser } from '@/api/authentication';
import useAuth from '@/app/common/hooks/useAuth';
import Button from '@/app/components/buttons/Button/Button';
import { LoginForm, loginValidationSchema } from '@/types/entities/Authentication';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import './LoginPage.scss';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface LoginPageProps {
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage = ({ setIsLoginForm }: LoginPageProps) => {
  const { setIsLoggedIn } = useAuth();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const currentYear: number = useMemo(() => {
    return new Date().getFullYear();
  }, []);

  const onLogIn = async (data: LoginForm) => {
    loginUser(data.username, data.password, data.stayLoggedIn)
      .then(() => {
        setIsLoggedIn(true);
        reset();
      })
      // #TODO proper error handling
      .catch(() => alert('an error occured'));
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
    <div className='login_container'>
      <form className='login_form' onSubmit={handleSubmit(onLogIn)}>
        <h1 className='title'>Sign In</h1>
        <TextField
          label='Username'
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
        <p className='login_form_text_swap_form' onClick={() => setIsLoginForm((isLoginForm: boolean) => !isLoginForm)}>
          Don't have an account? Register here!
        </p>
        <footer>
          <p className='login_form_text_footer'>To be able to access application you need an account</p>
          <p className='login_form_text_footer'>Copyright © {currentYear} Sourcery graduates</p>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
