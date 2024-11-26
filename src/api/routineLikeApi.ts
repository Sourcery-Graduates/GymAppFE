import api from '@/config/axios/config';
import { HttpStatusCode } from 'axios';

export enum RoutineLike_Endpoint {
  ROUTINE_LIKE = 'api/workout/routine/like',
}

export const like = async (id: string, method: 'POST' | 'DELETE'): Promise<HttpStatusCode> => {
  const url = `${RoutineLike_Endpoint.ROUTINE_LIKE}/${id}`;

  const response = method === 'POST' ? await api.post(url) : await api.delete(url);

  return response.status;
};
