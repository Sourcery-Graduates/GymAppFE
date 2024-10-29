import '../MyProfile.scss';
import { Alert, Avatar, Button, Snackbar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Profile } from '@/types/entities/UserProfile';
import { useEffect, useState } from 'react';

interface ProfileReadProps {
  editAction: () => void;
  profile: Profile;
  errorLoading: boolean;
}

const ProfileRead = (props: ProfileReadProps) => {
  const [snackbarOpen, setSnackbarOpen] = useState(props.errorLoading);

  useEffect(() => {
    if (props.errorLoading) {
      setSnackbarOpen(true);
    }
  }, [props.errorLoading]);

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
          <Button variant='outlined' color='error'>
            Logout
          </Button>
          <Button variant='outlined' color='warning' onClick={props.editAction}>
            Edit
          </Button>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          Error loading profile data. Please try again later.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProfileRead;
