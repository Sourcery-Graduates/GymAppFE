import { loginUser } from '@/api/authentication';
import useAuth from '@/app/common/hooks/useAuth';
import Button from '@/app/components/buttons/Button/Button';
import { LoginForm, loginValidationSchema } from '@/types/entities/Authentication';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import './LoginPage.scss';

interface LoginPageProps {
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage = ({ setIsLoginForm }: LoginPageProps) => {
  const { setIsLoggedIn } = useAuth();

  const currentYear: number = useMemo(() => {
    return new Date().getFullYear();
  }, []);

  const onLogIn = async (data: LoginForm) => {
    loginUser(data.username, data.password, data.stayLoggedIn)
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch();
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
          type='password'
          size='small'
          className='form-field'
          variant='filled'
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          onBlur={() => clearErrors('password')}
        />
        <div className='form-field'>
          <label htmlFor='checkbox'>Remember me</label>
          <input id='checkbox' type='checkbox' {...register('stayLoggedIn')} />
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
