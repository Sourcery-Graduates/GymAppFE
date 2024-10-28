import '../MyProfile.scss';
import { Avatar, Button } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Profile } from '@/types/entities/UserProfile';

interface ProfileReadProps {
  editAction: () => void;
  profile: Profile;
}

const ProfileRead = (props: ProfileReadProps) => {
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
    </div>
  );
};

export default ProfileRead;
