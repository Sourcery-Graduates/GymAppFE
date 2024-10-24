import { useState } from 'react';
import './MyProfile.scss';
import ProfileRead from './profileRead/ProfileRead';
import ProfileUpdate, { Profile } from './profileUpdate/ProfileUpdate';

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    firstname: 'John',
    lastname: 'Doe',
    username: 'john.doe.gym@gmail.com',
    location: 'Los Angeles, CA',
    bio: 'The most dangerous. A beast slayer. A conqueror of conqueror, the goat of all goats. The ultimate needle mover, the head of the table, the tribal chief. In god mode himself',
  });

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  return (
    <div className='my_profile'>
      {!isEditing && <ProfileRead editAction={toggleIsEditing} profile={profile} />}
      {isEditing && <ProfileUpdate cancelAction={toggleIsEditing} profile={profile} saveAction={handleSaveProfile} />}
    </div>
  );
};

export default MyProfile;
