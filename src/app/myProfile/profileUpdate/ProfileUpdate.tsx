import { GymTheme } from '@/MUITheme/GymTheme';
import '../MyProfile.scss';
import { Avatar, Stack, Button, TextField, ThemeProvider } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface Profile {
  firstname: string;
  lastname: string;
  username: string;
  bio: string;
  location: string;
}

interface ProfileUpdateProps {
  cancelAction: () => void;
  saveAction: (profile: Profile) => void;
  profile: Profile;
}

const validationSchema = Yup.object().shape({
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

const ProfileUpdate = (props: ProfileUpdateProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: props.profile,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: Profile) => {
    props.saveAction(data);
  };

  const onCancel = () => {
    reset(props.profile);
    props.cancelAction();
  };

  return (
    <ThemeProvider theme={GymTheme}>
      <form className='container' onSubmit={handleSubmit(onSubmit)}>
        <Avatar
          src='https://www.fit.pl/img/2007/02/_max/arnie.jpg'
          className='avatar-image'
          sx={{ bgcolor: deepPurple[500] }}
        >
          OP
        </Avatar>
        <Stack className='profile-data-container' margin={1}>
          <TextField
            label='Firstname'
            fullWidth
            className='form-field'
            variant='filled'
            {...register('firstname')}
            error={!!errors.firstname}
            helperText={errors.firstname?.message}
          />
          <TextField
            label='Lastname'
            fullWidth
            className='form-field'
            variant='filled'
            {...register('lastname')}
            error={!!errors.lastname}
            helperText={errors.lastname?.message}
          />
          <TextField
            label='Username'
            fullWidth
            className='form-field'
            variant='filled'
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            label='Location'
            fullWidth
            className='form-field'
            variant='filled'
            {...register('location')}
            error={!!errors.location}
            helperText={errors.location?.message}
          />
          <TextField
            label='Bio'
            fullWidth
            multiline
            rows={4}
            className='form-field'
            variant='filled'
            {...register('bio')}
            error={!!errors.bio}
            helperText={errors.bio?.message}
          />

          <Stack spacing={2} direction='row' margin={1}>
            <Button variant='outlined' color='info' type='submit'>
              Save
            </Button>
            <Button variant='outlined' color='error' onClick={onCancel}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </ThemeProvider>
  );
};

export default ProfileUpdate;
