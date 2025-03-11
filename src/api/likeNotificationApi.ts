import api from '@/config/axios/config';
import { PagedLikeNotification } from '@/types/entities/LikeNotification';

export const LIKE_NOTIFICATION_ENDPOINT = 'api/user-profile/like-notifications';

export const fetchLikeNotifications = async (page: number, size: number = 10): Promise<PagedLikeNotification> => {
  const response = await api.get(`${LIKE_NOTIFICATION_ENDPOINT}?page=${page}&size=${size}`);

  return response.data;
};
