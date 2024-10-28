import { useState } from 'react';
import './MyProfile.scss';
import ProfileRead from './profileRead/ProfileRead';
import ProfileUpdate from './profileUpdate/ProfileUpdate';
import { Profile } from '@/types/entities/UserProfile';
// import { emptyUserProfile } from './EmptyUserProfile';
import { useQuery } from '@tanstack/react-query';
import { getMyUserProfile } from '@/api/userProfileApi';
import { emptyUserProfile } from './EmptyUserProfile';

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  // const [profile, setProfile] = useState<Profile>(emptyUserProfile);

  const {
    data: profile,
    error,
    isLoading,
  } = useQuery<Profile>({
    queryKey: ['userProfile'],
    queryFn: getMyUserProfile,
    retry: false,
  });

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = (updatedProfile: Profile) => {
    console.log(updatedProfile);
    setIsEditing(false);
  };

  if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading profile</div>;

  return (
    <div className='my_profile'>
      {isEditing ? (
        <ProfileUpdate
          cancelAction={toggleIsEditing}
          profile={profile || emptyUserProfile}
          saveAction={handleSaveProfile}
        />
      ) : (
        <ProfileRead editAction={toggleIsEditing} profile={profile || emptyUserProfile} />
      )}
    </div>
  );
};

export default MyProfile;
