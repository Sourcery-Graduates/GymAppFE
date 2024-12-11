import api from '@/config/axios/config';
import { HttpStatusCode } from 'axios';

export enum RoutineLike_Endpoint {
  ROUTINE_LIKE = 'api/workout/routine/like',
}

export const like = async (id: string): Promise<HttpStatusCode> => {
  const response = await api.post(`${RoutineLike_Endpoint.ROUTINE_LIKE}/${id}`);

  return response.status;
};

export const dislike = async (id: string): Promise<HttpStatusCode> => {
  const response = await api.delete(`${RoutineLike_Endpoint.ROUTINE_LIKE}/${id}`);

  return response.status;
};
