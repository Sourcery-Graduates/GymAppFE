import { TAuthConfig } from 'react-oauth2-code-pkce';

//TODO: add env dependencies (local + remote)

export const oauth2Config: TAuthConfig = {
  clientId: 'public-client',
  authorizationEndpoint: 'http://localhost:8080/oauth2/authorize',
  tokenEndpoint: 'http://localhost:8080/oauth2/token',
  redirectUri: 'http://localhost:3000/',
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
