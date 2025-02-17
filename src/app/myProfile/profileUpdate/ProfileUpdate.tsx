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
import { AppAlertState } from '@/types/entities/AppAlert';

interface ProfileUpdateProps {
  cancelAction: () => void;
  saveAction: (profile: Profile, formData: FormData | null) => void;
  profile: Profile;
}

enum AllowedFileTypes {
  jpg = 'image/jpg',
  jpeg = 'image/jpeg',
  png = 'image/png',
  gif = 'image/gif',
}

const ProfileUpdate = (props: ProfileUpdateProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [alertState, setAlertState] = useState<AppAlertState>({
    open: false,
    text: '',
    severity: 'error',
  });

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

  const onSubmit = async (data) => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        setSelectedFile(null);
        props.saveAction(data, formData);
        return;
      }
      props.saveAction(data, null);
      return;
    } catch (error) {
      setAlertState({
        open: true,
        text: 'Profile data could not be saved',
        severity: 'error',
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 524288) {
      setAlertState({
        open: true,
        text: 'File size must be less than 5MB',
        severity: 'error',
      });
      return;
    }
    if (!Object.values(AllowedFileTypes).includes(file.type as AllowedFileTypes)) {
      setAlertState({
        open: true,
        text: 'File type not allowed',
        severity: 'error',
      });
      return;
    }
    setSelectedFile(file);
  };

  const onCancel = () => {
    reset(props.profile);
    props.cancelAction();
  };

  const handleSnackbarClose = () => {
    setAlertState({ ...alertState, open: false });
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
        open={alertState.open}
        onClose={handleSnackbarClose}
        text={alertState.text}
        severity={alertState.severity}
      />
    </form>
  );
};

export default ProfileUpdate;
