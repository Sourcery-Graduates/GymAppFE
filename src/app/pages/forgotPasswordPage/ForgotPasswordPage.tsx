import { passwordReset } from '@/api/authentication.ts';
import './ForgotPasswordPage.scss';
import Button from '@/app/components/buttons/Button/Button.tsx';
import { CurrentAuthenticationForm } from '@/app/pages/authenticationPage/AuthenticationPage.tsx';
import { ForgotPasswordForm, forgotPasswordValidationSchema } from '@/types/entities/Authentication.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { AlertColor, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import Footer from '@/app/layout/notAuthenticatedLayout/footer/Footer.tsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AppRoutes } from '@/types/routes.ts';
import AppAlert from '@/app/components/alerts/AppAlert.tsx';

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(forgotPasswordValidationSchema),
  });

  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('info');

  const handleSnackbarClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason && reason !== 'timeout') {
      return;
    }
    setSnackbarOpen(false);
  };

  const { mutate } = useMutation({
    mutationFn: async (data: ForgotPasswordForm) => {
      await passwordReset(data);
    },
    onSuccess: () => {
      setSnackbarOpen(true);
      setSnackbarText('Email with password reset was send to your email address');
      setSnackbarSeverity('success');
      reset();
      navigate(AppRoutes.LOGIN);
    },
    onError: (error: AxiosError) => {
      setSnackbarOpen(true);
      setSnackbarText(error.response?.data?.message);
      setSnackbarSeverity('error');
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordForm> = (data) => {
    mutate(data);
  };

  return (
    <div className='forgot_password_container'>
      <form className='forgot_password_form' onSubmit={handleSubmit(onSubmit)}>
        <h2 className='forgot_password_header'>Update your password</h2>
        <p className='forgot_password_description'>
          We will send you an e-mail with instructions on how to reset your password.
        </p>
        <TextField
          label='E-mail address'
          size='small'
          className='forgot_password_form-field'
          variant='filled'
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          onBlur={() => clearErrors('email')}
        />
        <Button className='forgot_password_email_button' type='submit' dataTestId='send-email-button'>
          Send E-mail
        </Button>
        <p
          className='forgot_password_login_redirect'
          onClick={() => navigate(AppRoutes.LOGIN)}
          data-testid='return-login-page-link'
        >
          Return to login page
        </p>
      </form>
      <Footer />
      <AppAlert open={snackbarOpen} onClose={handleSnackbarClose} text={snackbarText} severity={snackbarSeverity} />
    </div>
  );
};

export default ForgotPasswordPage;
