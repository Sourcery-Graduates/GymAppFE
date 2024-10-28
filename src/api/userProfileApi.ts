import api from '@/config/axios/config';
import { Profile, ProfileWithSettings } from '@/types/entities/UserProfile';

const userProfileApiUrl = 'api/user-profile';

export const getMyUserProfile: () => Promise<Profile> = async () => {
  const response = await api.get(userProfileApiUrl);
  const userProfile: ProfileWithSettings = response.data;
  const data: Profile = { ...userProfile };
  return data;
};
