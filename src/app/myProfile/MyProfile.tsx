import { useState } from 'react';
import './MyProfile.scss';
import ProfileRead from './profileRead/ProfileRead';
import ProfileUpdate from './profileUpdate/ProfileUpdate';
import { Profile } from '@/types/entities/UserProfile';
import { mockUserProfile } from './mockUserProfile';

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile>(mockUserProfile);

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  return (
    <div className='my_profile'>
      {isEditing ? (
        <ProfileUpdate cancelAction={toggleIsEditing} profile={profile} saveAction={handleSaveProfile} />
      ) : (
        <ProfileRead editAction={toggleIsEditing} profile={profile} />
      )}
    </div>
  );
};

export default MyProfile;
