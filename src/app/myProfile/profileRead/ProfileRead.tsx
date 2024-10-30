import '../MyProfile.scss';
import { Avatar, Button } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Profile } from '@/types/entities/UserProfile';
import { useState } from 'react';
import AppAlert from '@/app/components/alerts/AppAlert';
import useAuth from '@/app/common/hooks/useAuth';

interface ProfileReadProps {
  editAction: () => void;
  profile: Profile;
  errorLoading: boolean;
}

const ProfileRead = (props: ProfileReadProps) => {
  const { logOutUser } = useAuth();

  const [snackbarOpen, setSnackbarOpen] = useState(props.errorLoading);
  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className='container'>
      <Avatar src={props.profile.avatarUrl} className='avatar-image' sx={{ bgcolor: deepPurple[500] }}></Avatar>

      <div className='profile-data-container'>
        <h3 className='fullname-text'>
          {props.profile.firstName} {props.profile.lastName}
        </h3>
        <h4 className='username-text'>{props.profile.username}</h4>

        <div className='location-field'>
          <LocationOnIcon className='location-icon' />
          <p>{props.profile.location}</p>
        </div>

        <div className='bio-field'>
          <p>{props.profile.bio}</p>
        </div>

        <div className='form-control'>
          <Button variant='outlined' color='error' onClick={logOutUser}>
            Logout
          </Button>
          <Button variant='outlined' color='warning' onClick={props.editAction}>
            Edit
          </Button>
        </div>
      </div>
      <AppAlert
        open={snackbarOpen}
        onClose={handleClose}
        text='Error loading profile data. Please try again later.'
        severity='error'
      />
    </div>
  );
};

export default ProfileRead;
