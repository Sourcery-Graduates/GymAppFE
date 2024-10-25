import '../MyProfile.scss';
import { Avatar, Button, TextField } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validationSchema';
import { Profile } from '@/types/entities/UserProfile';

interface ProfileUpdateProps {
  cancelAction: () => void;
  saveAction: (profile: Profile) => void;
  profile: Profile;
}

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
    <form className='container' onSubmit={handleSubmit(onSubmit)}>
      <Avatar src={props.profile.avatarUrl} className='avatar-image' sx={{ bgcolor: deepPurple[500] }}>
        OP
      </Avatar>
      <div className='profile-data-container'>
        <TextField
          label='Firstname'
          fullWidth
          size='small'
          className='form-field'
          variant='filled'
          {...register('firstname')}
          error={!!errors.firstname}
          helperText={errors.firstname?.message}
        />
        <TextField
          label='Lastname'
          fullWidth
          size='small'
          className='form-field'
          variant='filled'
          {...register('lastname')}
          error={!!errors.lastname}
          helperText={errors.lastname?.message}
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
    </form>
  );
};

export default ProfileUpdate;
