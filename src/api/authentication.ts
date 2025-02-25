import api from '@/config/axios/config';
import { ForgotPasswordForm, PasswordChangeRequest, Register } from '@/types/entities/Authentication';

const baseUrl = 'api/auth';

export enum Auth_Endpoint {
  PASSWORD_CHANGE = `${baseUrl}/password/change`,
  PASSWORD_RESET = `${baseUrl}/password/reset`,
  REGISTER = `${baseUrl}/register`,
  REGISTER_VERIFICATION = `${baseUrl}/register/verification`,
}

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

const authUrl = import.meta.env.VITE_AUTH_URL;

export const logoutRequest = async () => {
  try {
    await fetch(`${authUrl}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    localStorage.removeItem("ROCP_token");
    localStorage.removeItem("ROCP_idToken");
    localStorage.removeItem("ROCP_tokenExpire");
    sessionStorage.removeItem("ROCP_token");
    sessionStorage.removeItem("ROCP_idToken");
    sessionStorage.removeItem("ROCP_tokenExpire");

    window.location.href = "/login";
  } catch (error) {
    console.error("Error during logout: ", error);
  }
};

export const refreshAccessToken = async () => {
  try {
    const response = await fetch(`${authUrl}/token`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: 'public-client',
      }),
    });

    if (!response.ok) {
      throw new Error('Error updating tokens');
    }

    const data = await response.json();

    localStorage.setItem('ROCP_token', data.access_token);
    if (data.id_token) {
      localStorage.setItem('ROCP_idToken', data.id_token);
    }
    localStorage.setItem('ROCP_tokenExpire', (Math.floor(Date.now() / 1000) + data.expires_in).toString());

  } catch (error) {
    console.error('Error updating tokens\':', error);
    localStorage.removeItem('ROCP_token');
    localStorage.removeItem('ROCP_idToken');
    window.location.href = '/login';
  }
};
