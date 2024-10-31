import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  exerciseId: Yup.string().required('Exercise must be chosen'),
  defaultSets: Yup.number().required('Sets is required'),
  defaultReps: Yup.number().required('Reps is required'),
  defaultWeight: Yup.number().required('Weight is required'),
  defaultRestTime: Yup.string().required('Rest time is required'),
  notes: Yup.string().max(1000, 'Notes must be at most 1000 characters'),
});
