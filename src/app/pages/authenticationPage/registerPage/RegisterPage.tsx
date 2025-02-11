import { registerUser } from '@/api/authentication';
import Button from '@/app/components/buttons/Button/Button';
import { Register, registerValidationSchema } from '@/types/entities/Authentication';
import { yupResolver } from '@hookform/resolvers/yup';
import { AlertColor, IconButton, InputAdornment, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import './RegisterPage.scss';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { CurrentAuthenticationForm } from '@/app/pages/authenticationPage/AuthenticationPage';
import Footer from '@/app/layout/notAuthenticatedLayout/footer/Footer';

interface RegisterPageProps {
  setCurrentForm: React.Dispatch<React.SetStateAction<CurrentAuthenticationForm>>;
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackbarText: React.Dispatch<React.SetStateAction<string>>;
  setSnackbarSeverity: React.Dispatch<React.SetStateAction<AlertColor>>;
}

const RegisterPage = ({ setCurrentForm, setSnackbarOpen, setSnackbarText, setSnackbarSeverity }: RegisterPageProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<Register>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(registerValidationSchema),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: Register) => {
      await registerUser(data);
    },
    onSuccess: () => {
      setSnackbarOpen(true);
      setSnackbarText('Account created, verify by link in email!');
      setSnackbarSeverity('success');
      setCurrentForm(CurrentAuthenticationForm.LOGIN_FORM);
      reset();
    },
    onError: (error) => {
      setSnackbarOpen(true);
      setSnackbarText(error.response?.data?.message);
      setSnackbarSeverity('error');
    },
  });

  const onSubmit: SubmitHandler<Register> = (data) => {
    mutate(data);
  };

  return (
    <>
      <div className='register_container'>
        <form className='register_form' onSubmit={handleSubmit(onSubmit)}>
          <h1 className='title'>Sign Up</h1>
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
          <TextField
            label='Email adress'
            size='small'
            className='form-field'
            variant='filled'
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            onBlur={() => clearErrors('email')}
          />
          <Button type='submit'>Register</Button>
        </form>
        <div className='register_form_text'>
          <p
            className='register_form_text_swap_form'
            onClick={() => setCurrentForm(CurrentAuthenticationForm.LOGIN_FORM)}
          >
            Already have an account? Log in here
          </p>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
