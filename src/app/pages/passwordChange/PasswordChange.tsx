import { AlertColor, Divider, IconButton, InputAdornment, TextField } from '@mui/material';
import './PasswordChange.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  PasswordChangeForm,
  PasswordChangeRequest,
  passwordChangeValidationSchema,
} from '@/types/entities/Authentication';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@/app/components/buttons/Button/Button';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { AppRoutes } from '@/types/routes';
import AppAlert from '@/app/components/alerts/AppAlert';
import { useMutation } from '@tanstack/react-query';
import { passwordChange } from '@/api/authentication';
import { AxiosError } from 'axios';
import BasicSpinner from '@/app/components/loaders/BasicSpinner';

const PasswordChange = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('info');

  const navigateToLoginPage = () => {
    navigate(AppRoutes.HOME);
  };

  useEffect(() => {
    if (token === null) {
      navigateToLoginPage();
    }
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleClickShowRepeatedPassword = () => {
    setShowRepeatedPassword((showPassword) => !showPassword);
  };

  const handleSnackbarClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason && reason !== 'timeout') {
      return;
    }
    setSnackbarOpen(false);
  };

  const {
    register,
    reset,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<PasswordChangeForm>({
    defaultValues: {
      password: '',
      repeatedPassword: '',
    },
    resolver: yupResolver(passwordChangeValidationSchema),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: PasswordChangeForm) => {
      const requestForm: PasswordChangeRequest = {
        password: data.password,
        repeatedPassword: data.repeatedPassword,
        token: token,
      };
      await passwordChange(requestForm);
    },
    onSuccess: () => {
      setSnackbarOpen(true);
      setSnackbarText('Password was changed sucessfully!');
      setSnackbarSeverity('success');
      reset();
    },
    onError: (error: AxiosError) => {
      setSnackbarOpen(true);
      setSnackbarText(error.response?.data?.message);
      setSnackbarSeverity('error');
    },
  });

  const onSubmit = (data: PasswordChangeForm) => {
    mutate(data);
  };

  return (
    <>
      {token === null ? (
        <BasicSpinner />
      ) : (
        <div className='password_change_container'>
          <form className='password_change_form' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='password_change_header'>Reset your password</h2>
            <Divider />
            <p className='password_change_description'>
              Enter your new password below. Once changed, you’ll need to use the new password to log in.
            </p>
            <TextField
              label='New Password'
              size='small'
              className='change_password_form-field'
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
              label='Confirm New Password'
              size='small'
              className='change_password_form-field'
              variant='filled'
              {...register('repeatedPassword')}
              error={!!errors.repeatedPassword}
              helperText={errors.repeatedPassword?.message}
              onBlur={() => clearErrors('repeatedPassword')}
              type={showRepeatedPassword ? 'text' : 'password'}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        className={'show-password-button'}
                        aria-label={showRepeatedPassword ? 'hide the password' : 'display the password'}
                        onClick={handleClickShowRepeatedPassword}
                        edge='end'
                      >
                        {showRepeatedPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button type='submit'>Change password</Button>
            <p className='password_change_login_redirect' onClick={navigateToLoginPage}>
              Return to login page
            </p>
          </form>
          <AppAlert open={snackbarOpen} onClose={handleSnackbarClose} text={snackbarText} severity={snackbarSeverity} />
        </div>
      )}
    </>
  );
};

export default PasswordChange;
