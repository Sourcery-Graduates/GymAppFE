import { registerUser } from '@/api/authentication';
import Button from '@/app/components/buttons/Button/Button';
import { Register, registerValidationSchema } from '@/types/entities/Authentication';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import './RegisterPage.scss';
import { useMemo } from 'react';

interface RegisterPageProps {
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterPage = ({ setIsLoginForm }: RegisterPageProps) => {
  const currentYear: number = useMemo(() => {
    return new Date().getFullYear();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(registerValidationSchema),
  });

  const { mutate } = useMutation({
    mutationFn: (data: Register) => registerUser(data),
  });

  // const onRegister = (data: RegisterBody) => {
  //   registerUser(data.username, data.password, data.email)
  //     .then(() => {})
  //     .catch();
  // };
  return (
    <div className='register_container'>
      <form className='register_form' onSubmit={handleSubmit(mutate)}>
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
          type='password'
          size='small'
          className='form-field'
          variant='filled'
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          onBlur={() => clearErrors('password')}
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
  );
};

export default RegisterPage;
