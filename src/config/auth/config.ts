import { TAuthConfig } from 'react-oauth2-code-pkce';

const authUrl = import.meta.env.VITE_AUTH_URL;
const redirectUri = import.meta.env.VITE_REDIRECT_URI;

export const oauth2Config: TAuthConfig = {
  clientId: 'public-client',
  authorizationEndpoint: `${authUrl}/authorize`,
  tokenEndpoint: `${authUrl}/token`,
  redirectUri: `${redirectUri}`,
  scope: 'openid profile',
  storage: 'local',
  decodeToken: true,
  autoLogin: false,
  clearURL: true,
  tokenRequestCredentials: 'include',
  postLogin: () => {
    localStorage.removeItem('PKCE_code_verifier');
  },
};
