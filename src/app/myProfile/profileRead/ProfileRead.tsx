import '../MyProfile.scss';
import { Avatar, Box, Typography, Stack, Button } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Profile } from '../profileUpdate/ProfileUpdate';

interface ProfileReadProps {
  editAction: () => void;
  profile: Profile;
}

const ProfileRead = (props: ProfileReadProps) => {
  return (
    <div className='container'>
      <Avatar
        src='https://www.fit.pl/img/2007/02/_max/arnie.jpg'
        className='avatar-image'
        sx={{ bgcolor: deepPurple[500] }}
      >
        OP
      </Avatar>

      <Stack spacing={2} className='profile-data-container' margin={1}>
        <h3 className='fullname-text'>
          {props.profile.firstname} {props.profile.lastname}
        </h3>
        <h4 className='username-text'>{props.profile.username}</h4>

        <Box display='flex' alignItems='center' my={2}>
          <LocationOnIcon sx={{ mr: 1 }} />
          <Typography variant='body2'>{props.profile.location}</Typography>
        </Box>

        <Box my={2}>
          <Typography variant='body2'>{props.profile.bio}</Typography>
        </Box>
        <Stack spacing={2} direction='row' className='form-control' margin={1}>
          <Button variant='outlined' color='error'>
            Logout
          </Button>
          <Button variant='outlined' color='warning' onClick={props.editAction}>
            Edit
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default ProfileRead;
