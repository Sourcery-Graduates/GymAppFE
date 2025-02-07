import * as Yup from 'yup';

export interface Register {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  location?: string;
  bio?: string;
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

export const baseRegistrationValidationSchema = baseValidationSchema.shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address')
    .max(128, 'Email must be at most 128 characters'),
});

export const registerValidationSchema = baseRegistrationValidationSchema.shape({
  firstName: Yup.string().required('First name is required').max(64, 'First name must be at most 64 characters'),
  lastName: Yup.string().required('Last name is required').max(64, 'Last name must be at most 64 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be at most 128 characters')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
  location: Yup.string().max(128, 'Location must be at most 128 characters'),
  bio: Yup.string().max(340, 'Bio must be at most 340 characters'),
});
