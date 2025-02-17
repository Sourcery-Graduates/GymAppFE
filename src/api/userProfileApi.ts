import api from '@/config/axios/config';
import { Profile, ProfileWithSettings } from '@/types/entities/UserProfile';

const userProfileApiUrl = 'api/user-profile';

export const getMyUserProfile: () => Promise<Profile> = async () => {
  const response = await api.get(userProfileApiUrl);

  const userProfile: ProfileWithSettings = response.data;
  const data: Profile = { ...userProfile };

  return data;
};

export const updateMyUserProfile: (payload: Profile) => Promise<Profile> = async (payload) => {
  const body: ProfileWithSettings = {
    ...payload,
    settings: {
      claim: 'true',
    },
  };
  const response = await api.put(userProfileApiUrl, body);
  const userProfile: ProfileWithSettings = response.data;
  const data: Profile = { ...userProfile };
  return data;
};

export const uploadProfilePhoto = async (formData: FormData) => {
  try {
    const response = await api.put(`${userProfileApiUrl}/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Upload error', error);
  }
};
