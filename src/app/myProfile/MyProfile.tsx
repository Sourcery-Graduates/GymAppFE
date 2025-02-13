import { useState } from 'react';
import './MyProfile.scss';
import ProfileRead from './profileRead/ProfileRead';
import ProfileUpdate from './profileUpdate/ProfileUpdate';
import { Profile } from '@/types/entities/UserProfile';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyUserProfile, updateMyUserProfile, uploadProfilePhoto } from '@/api/userProfileApi';
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

  const { mutate: sendUpdatedProfile, error: errorMutation } = useMutation({
    mutationKey: ['userProfile'],
    mutationFn: updateMyUserProfile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userProfile'], exact: true }),
  });

  const { mutate: sendProfilePhoto } = useMutation({
    mutationKey: ['userProfilePhoto'],
    mutationFn: uploadProfilePhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'], exact: true });
    },
  });

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async (updatedProfile: Profile, formData: FormData) => {
    sendUpdatedProfile(updatedProfile);
    if (formData) {
      sendProfilePhoto(formData);
    }
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
