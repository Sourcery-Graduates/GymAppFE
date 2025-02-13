import { Avatar, Button, Input, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validationSchema';
import { Profile } from '@/types/entities/UserProfile';
import AppAlert from '@/app/components/alerts/AppAlert';
import { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import '../MyProfile.scss';
import './ProfileUpdate.scss';

interface ProfileUpdateProps {
  cancelAction: () => void;
  saveAction: (profile: Profile, formData: FormData) => void;
  profile: Profile;
}

enum AllowedFileTypes {
  jpg = 'image/jpg',
  jpeg = 'image/jpeg',
  png = 'image/png',
  gif = 'image/gif',
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
    defaultValues: {
      firstName: props.profile.firstName,
      lastName: props.profile.lastName,
      username: props.profile.username,
      bio: props.profile.bio,
      location: props.profile.location,
    },
    resolver: yupResolver(validationSchema),
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('file', selectedFile);
        setSelectedFile(null);
      }
      props.saveAction(data, formData);
    } catch (error) {
      if (error) setSnackbarOpen(true);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 524288) {
      console.log('File over 5MB');
      return;
    }
    if (!Object.values(AllowedFileTypes).includes(file.type as AllowedFileTypes)) {
      console.log('Invalid file type');
      return;
    }
    setSelectedFile(file);
  };

  const onCancel = () => {
    reset(props.profile);
    props.cancelAction();
  };

  return (
    <form className='container' onSubmit={handleSubmit(onSubmit)}>
      <div className='profile-photo'>
        <Avatar
          src={selectedFile ? URL.createObjectURL(selectedFile) : props.profile.avatarUrl}
          className='avatar-image'
        ></Avatar>
        <Button
          component='label'
          variant='outlined'
          color='info'
          startIcon={<CloudUploadIcon />}
          className='profile-photo__button'
        >
          Upload photo
          <Input type='file' onChange={handleFileUpload} className='profile-photo__input' />
        </Button>
      </div>
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
