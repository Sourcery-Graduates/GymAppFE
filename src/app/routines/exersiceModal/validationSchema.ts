import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  exerciseId: Yup.string().required('Exercise must be chosen'),
  defaultSets: Yup.number().required('Default sets is required'),
  defaultReps: Yup.number().required('Default reps is required'),
  defaultWeight: Yup.number().required('Default weight is required'),
  defaultRestTime: Yup.string().required('Default rest time is required'),
  notes: Yup.string().max(1000, 'Notes must be at most 1000 characters'),
});
