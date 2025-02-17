import { useState } from 'react';
import './MyProfile.scss';
import ProfileRead from './profileRead/ProfileRead';
import ProfileUpdate from './profileUpdate/ProfileUpdate';
import { Profile } from '@/types/entities/UserProfile';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyUserProfile, updateMyUserProfile, uploadProfilePhoto } from '@/api/userProfileApi';
import { emptyUserProfile } from './EmptyUserProfile';
import BasicSpinner from '../components/loaders/BasicSpinner';
import AppAlert from '../components/alerts/AppAlert';
import { AppAlertState } from '@/types/entities/AppAlert';

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const [alertState, setAlertState] = useState<AppAlertState>({
    open: false,
    text: '',
    severity: 'error',
  });

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'], exact: true });
      setAlertState({
        open: true,
        text: 'Profile updated successfully',
        severity: 'success',
      });
    },
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

  const handleSaveProfile = async (updatedProfile: Profile, formData: FormData | null) => {
    const profileToUpdate = { ...updatedProfile };

    if (profile?.avatarUrl) {
      profileToUpdate.avatarUrl = profile.avatarUrl;
    }
    sendUpdatedProfile(profileToUpdate);
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
      <AppAlert
        open={alertState.open}
        severity={alertState.severity}
        text={alertState.text}
        onClose={() => setAlertState({ ...alertState, open: false })}
      />
    </div>
  );
};

export default MyProfile;
