import api from '@/config/axios/config';
import { LoginResponse, Register } from '@/types/entities/Authentication';

export enum Auth_Endpoint {
  LOGIN = 'api/auth/authenticate',
  REGISTER = 'api/auth/register',
}

export const loginUser = async (username: string, password: string, stayLoggedIn: boolean): Promise<void> => {
  const basicAuthHeader = btoa(`${username}:${password}`);
  const config = { headers: { Authorization: 'Basic ' + basicAuthHeader } };

  const response = await api.get(Auth_Endpoint.LOGIN, config);
  const data: LoginResponse = response.data;

  if (stayLoggedIn) {
    localStorage.setItem('token', data.token);
  } else {
    sessionStorage.setItem('token', data.token);
  }
};

export const registerUser = async (requestBody: Register): Promise<void> => {
  await api.post(Auth_Endpoint.REGISTER, requestBody);
};
