import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  exerciseId: Yup.string().required('Exercise must be chosen'),
  defaultSets: Yup.number()
    .typeError('Sets must be a valid number')
    .required('Sets is required')
    .min(0, 'Reps must be > 0'),
  defaultReps: Yup.number()
    .typeError('Reps must be a valid number')
    .required('Reps is required')
    .min(0, 'Reps must be > 0'),
  defaultWeight: Yup.number()
    .typeError('Weight must be a valid number')
    .required('Weight is required')
    .min(0, 'Weight must be > 0'),
  weightUnit: Yup.string()
    .required('Weight unit must be kg or lbs')
    .oneOf(['kg', 'lbs'], 'Weight unit must be kg or lbs'),

  defaultRestTime: Yup.number()
    .typeError('Rest time must be a valid number')
    .required('Rest time is required')
    .min(0, 'Rest time must be > 0'),
  restTimeUnit: Yup.string()
    .required('Rest time unit must be seconds or minutes')
    .oneOf(['seconds', 'minutes'], 'Rest time unit must be seconds or minutes'),
  notes: Yup.string().max(1000, 'Notes must be at most 1000 characters'),
});
