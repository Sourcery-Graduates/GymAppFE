import * as Yup from 'yup';

export interface Register {
  username: string;
  password: string;
  email: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface LoginForm {
  username: string;
  password: string;
  stayLoggedIn: boolean;
}

export interface LoginResponse {
  token: string;
}

const baseValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(32, 'Username must be at most 32 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be at most 128 characters'),
});

export const loginValidationSchema = baseValidationSchema.shape({
  stayLoggedIn: Yup.boolean().required(),
});

export const registerValidationSchema = baseValidationSchema.shape({
  email: Yup.string().required('Email is required').email('Invalid email address'),
});
