import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .required('Firstname is required')
    .min(3, 'Firstname must be at least 3 characters')
    .max(64, 'Firstname must be at most 64 characters'),
  lastname: Yup.string()
    .required('Lastname is required')
    .min(3, 'Lastname must be at least 3 characters')
    .max(64, 'Lastname must be at most 64 characters'),
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(32, 'Username must be at most 32 characters'),
  location: Yup.string().required('Location is required').max(128, 'Location must be at most 128 characters'),
  bio: Yup.string().max(340, 'Bio must be at most 340 characters'),
});
