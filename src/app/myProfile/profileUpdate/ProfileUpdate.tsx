import '../MyProfile.scss';
import { Avatar, Button, TextField } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validationSchema';
import { Profile } from '@/types/entities/UserProfile';
import AppAlert from '@/app/components/alerts/AppAlert';
import { useState } from 'react';

interface ProfileUpdateProps {
  cancelAction: () => void;
  saveAction: (profile: Profile) => void;
  profile: Profile;
}

const ProfileUpdate = (props: ProfileUpdateProps) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false); // Close Snackbar
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: props.profile,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: Profile) => {
    try {
      await props.saveAction(data); // Await mutation
    } catch (error) {
      if (error) setSnackbarOpen(true);
    }
  };

  const onCancel = () => {
    reset(props.profile);
    props.cancelAction();
  };

  return (
    <form className='container' onSubmit={handleSubmit(onSubmit)}>
      <Avatar src={props.profile.avatarUrl} className='avatar-image' sx={{ bgcolor: deepPurple[500] }}></Avatar>
      <div className='profile-data-container'>
        <TextField
          label='Firstname'
          fullWidth
          size='small'
          className='form-field'
          variant='filled'
          {...register('firstName')}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <TextField
          label='Lastname'
          fullWidth
          size='small'
          className='form-field'
          variant='filled'
          {...register('lastName')}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
        <TextField
          label='Username'
          fullWidth
          size='small'
          className='form-field'
          variant='filled'
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          label='Location'
          fullWidth
          size='small'
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
          size='small'
          rows={4}
          className='form-field'
          variant='filled'
          {...register('bio')}
          error={!!errors.bio}
          helperText={errors.bio?.message}
        />

        <div className='form-control'>
          <Button variant='outlined' color='info' type='submit'>
            Save
          </Button>
          <Button variant='outlined' color='error' onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
      <AppAlert
        open={snackbarOpen}
        onClose={handleClose}
        text='Error saving profile data. Please try again later.'
        severity='error'
      />
    </form>
  );
};

export default ProfileUpdate;
