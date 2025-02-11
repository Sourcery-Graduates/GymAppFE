import api from '@/config/axios/config';
import { ForgotPasswordForm, LoginResponse, PasswordChangeRequest, Register } from '@/types/entities/Authentication';

const baseUrl = 'api/auth';

export enum Auth_Endpoint {
  LOGIN = `${baseUrl}/authenticate`,
  PASSWORD_CHANGE = `${baseUrl}/password/change`,
  PASSWORD_RESET = `${baseUrl}/password/reset`,
  REGISTER = `${baseUrl}/register`,
  REGISTER_VERIFICATION = `${baseUrl}/register/verification`,
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

export const registerVerification = async (token: string | null): Promise<string> => {
  const response = await api.get(Auth_Endpoint.REGISTER_VERIFICATION, { params: { token } });
  const data: string = response.data;
  return data;
};

export const passwordChange = async (requestBody: PasswordChangeRequest): Promise<string> => {
  const response = await api.post(Auth_Endpoint.PASSWORD_CHANGE, requestBody);
  const data: string = response.data;
  return data;
};

export const passwordReset = async (requestBody: ForgotPasswordForm): Promise<string> => {
  const response = await api.post(Auth_Endpoint.PASSWORD_RESET, requestBody);
  const data: string = response.data;
  return data;
};
