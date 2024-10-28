import * as Yup from 'yup';

export const routineValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(255, 'Name must be at most 255 characters'),
  description: Yup.string()
    .max(3000, 'Description must be at most 3000 characters'),
});