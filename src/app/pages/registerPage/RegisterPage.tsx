import { registerUser } from '@/api/authentication.ts';
import Button from '@/app/components/buttons/Button/Button.tsx';
import { Register, registerValidationSchema } from '@/types/entities/Authentication.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { AlertColor, Box, IconButton, InputAdornment, Step, StepLabel, Stepper, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import './RegisterPage.scss';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Footer from '@/app/layout/notAuthenticatedLayout/footer/Footer.tsx';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/types/routes.ts';
import AppAlert from '@/app/components/alerts/AppAlert.tsx';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Email', 'Username', 'Bio'];
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

  const handleNext = async () => {
    let fieldsToValidate: (keyof Register)[] = [];
    switch (activeStep) {
      case 0:
        fieldsToValidate = ['email', 'password', 'confirmPassword'];
        break;
      case 1:
        fieldsToValidate = ['username', 'firstName', 'lastName'];
        break;
    }

    const isValid = await trigger(fieldsToValidate, { shouldFocus: false });
    if (isValid) {
      setTimeout(() => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }, 100);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    clearErrors();
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm<Register>({
    mode: 'onTouched',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      location: '',
      bio: '',
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
      reset();
      navigate(AppRoutes.LOGIN);
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
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'stretch' }} pb={2}>
            <Stepper alternativeLabel={true} activeStep={activeStep} sx={{ width: '100%' }}>
              {steps.map((label, index) => {
                return (
                  <Step key={label} completed={activeStep > index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>

          {activeStep === 0 && (
            <>
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
                label='Confirm password'
                size='small'
                className='form-field'
                variant='filled'
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                onBlur={() => clearErrors('confirmPassword')}
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
            </>
          )}

          {activeStep === 1 && (
            <>
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
                label='First Name'
                size='small'
                className='form-field'
                variant='filled'
                {...register('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                onBlur={() => clearErrors('firstName')}
              />
              <TextField
                label='Last Name'
                size='small'
                className='form-field'
                variant='filled'
                {...register('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                onBlur={() => clearErrors('lastName')}
              />
            </>
          )}

          {activeStep === 2 && (
            <>
              <TextField
                label='Location (Optional)'
                size='small'
                className='form-field'
                variant='filled'
                {...register('location')}
                error={!!errors.location}
                helperText={errors.location?.message}
                onBlur={() => clearErrors('location')}
              />
              <TextField
                label='Bio (Optional)'
                fullWidth
                multiline
                size='small'
                rows={3}
                className='form-field'
                variant='filled'
                {...register('bio')}
                error={!!errors.bio}
                helperText={errors.bio?.message}
              />
            </>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button isDisabled={activeStep === 0} type='button' onClick={handleBack} dataTestId='back-button'>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep === steps.length - 1 ? (
              <Button type='submit' isDisabled={activeStep !== steps.length - 1} dataTestId='register-button'>
                Register
              </Button>
            ) : (
              <Button onClick={handleNext} dataTestId='next-button'>Next</Button>
            )}
          </Box>
        </form>

        <div className='register_form_text'>
          <p
            className='register_form_text_swap_form'
            onClick={() => navigate(AppRoutes.LOGIN)}
          >
            Already have an account? Log in here
          </p>
          <Footer />
        </div>
      </div>
      <AppAlert open={snackbarOpen} onClose={handleSnackbarClose} text={snackbarText} severity={snackbarSeverity} />
    </>
  );
};

export default RegisterPage;
