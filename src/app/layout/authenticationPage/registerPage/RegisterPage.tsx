import { registerUser } from '@/api/authentication';
import Button from '@/app/components/buttons/Button/Button';
import { Register, registerValidationSchema } from '@/types/entities/Authentication';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, IconButton, InputAdornment, Step, StepLabel, Stepper, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import './RegisterPage.scss';
import { useMemo, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AppAlert from '@/app/components/alerts/AppAlert';

interface RegisterPageProps {
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterPage = ({ setIsLoginForm }: RegisterPageProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Email', 'Username', 'Bio'];

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

  const handleSnackbarClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason && reason !== 'timeout') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const currentYear: number = useMemo(() => {
    return new Date().getFullYear();
  }, []);

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
      setIsLoginForm(true);
      reset();
    },
    onError: () => {
      setSnackbarOpen(true);
    },
  });

  return (
    <>
      <div className='register_container'>
        <form className='register_form' onSubmit={handleSubmit(mutate)}>
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
            <Button isDisabled={activeStep === 0} type='button' onClick={handleBack}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep === steps.length - 1 ? (
              <Button type='submit' isDisabled={activeStep !== steps.length - 1}>
                Register
              </Button>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </Box>
        </form>

        <div className='register_form_text'>
          <p
            className='register_form_text_swap_form'
            onClick={() => setIsLoginForm((isLoginForm: boolean) => !isLoginForm)}
          >
            Already have an account? Log in here
          </p>
          <footer>
            <p className='register_form_text_footer'>To be able to access application you need an account</p>
            <p className='register_form_text_footer'>Copyright © {currentYear} Sourcery graduates</p>
          </footer>
        </div>
      </div>
      <AppAlert
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        text='The username is already taken'
        severity='error'
      />
    </>
  );
};

export default RegisterPage;
