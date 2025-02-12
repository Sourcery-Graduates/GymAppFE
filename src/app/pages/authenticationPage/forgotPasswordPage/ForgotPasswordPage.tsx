import { passwordReset } from '@/api/authentication';
import './ForgotPasswordPage.scss';
import Button from '@/app/components/buttons/Button/Button';
import { CurrentAuthenticationForm } from '@/app/pages/authenticationPage/AuthenticationPage';
import { ForgotPasswordForm, forgotPasswordValidationSchema } from '@/types/entities/Authentication';
import { yupResolver } from '@hookform/resolvers/yup';
import { AlertColor, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import Footer from '@/app/layout/notAuthenticatedLayout/footer/Footer';

interface ForgotPasswordPageProps {
  setCurrentForm: React.Dispatch<React.SetStateAction<CurrentAuthenticationForm>>;
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackbarText: React.Dispatch<React.SetStateAction<string>>;
  setSnackbarSeverity: React.Dispatch<React.SetStateAction<AlertColor>>;
}

const ForgotPasswordPage = ({
  setCurrentForm,
  setSnackbarOpen,
  setSnackbarText,
  setSnackbarSeverity,
}: ForgotPasswordPageProps) => {
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

  const { mutate } = useMutation({
    mutationFn: async (data: ForgotPasswordForm) => {
      await passwordReset(data);
    },
    onSuccess: () => {
      setSnackbarOpen(true);
      setSnackbarText('Email with password reset was send to your email address');
      setSnackbarSeverity('success');
      setCurrentForm(CurrentAuthenticationForm.LOGIN_FORM);
      reset();
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
        <Button className='forgot_password_email_button' type='submit'>
          Send E-mail
        </Button>
        <p
          className='forgot_password_login_redirect'
          onClick={() => setCurrentForm(CurrentAuthenticationForm.LOGIN_FORM)}
        >
          Return to login page
        </p>
      </form>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
