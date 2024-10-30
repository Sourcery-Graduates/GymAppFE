import { useState } from 'react';
import './MyProfile.scss';
import ProfileRead from './profileRead/ProfileRead';
import ProfileUpdate from './profileUpdate/ProfileUpdate';
import { Profile } from '@/types/entities/UserProfile';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyUserProfile, updateMyUserProfile } from '@/api/userProfileApi';
import { emptyUserProfile } from './EmptyUserProfile';
import BasicSpinner from '../components/loaders/BasicSpinner';

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: profile,
    error: errorQuery,
    isLoading,
  } = useQuery<Profile>({
    queryKey: ['userProfile'],
    queryFn: getMyUserProfile,
    retry: false,
  });

  const { mutateAsync: sendUpdatedProfile, error: errorMutation } = useMutation({
    mutationKey: ['userProfile'],
    mutationFn: updateMyUserProfile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userProfile'], exact: true }),
  });

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async (updatedProfile: Profile) => {
    await sendUpdatedProfile(updatedProfile);
    if (!errorMutation) setIsEditing(false);
  };

  return (
    <div className='my_profile'>
      {isLoading ? (
        <div className='spinner-container'>
          <BasicSpinner />
        </div>
      ) : isEditing ? (
        <ProfileUpdate
          cancelAction={toggleIsEditing}
          profile={profile || emptyUserProfile}
          saveAction={handleSaveProfile}
        />
      ) : (
        <ProfileRead errorLoading={!!errorQuery} editAction={toggleIsEditing} profile={profile || emptyUserProfile} />
      )}
    </div>
  );
};

export default MyProfile;
