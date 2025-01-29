import { registerUser } from '@/api/authentication';
import Button from '@/app/components/buttons/Button/Button';
import { Register, registerValidationSchema } from '@/types/entities/Authentication';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, IconButton, InputAdornment, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import './RegisterPage.scss';
import { useMemo, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AppAlert from '@/app/components/alerts/AppAlert';

interface RegisterPageProps {
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const steps = ['Choose username', 'Write your bio'];

const RegisterPage = ({ setIsLoginForm }: RegisterPageProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
            </>
          )}

          {activeStep === 1 && (
            <>
              <TextField label='First Name' size='small' className='form-field' variant='filled' />
              <TextField label='Last Name' size='small' className='form-field' variant='filled' />
              <TextField label='Location (Optional)' size='small' className='form-field' variant='filled' />
            </>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button isDisabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep === steps.length - 1 ? (
              <Button type='submit'>Register</Button>
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
