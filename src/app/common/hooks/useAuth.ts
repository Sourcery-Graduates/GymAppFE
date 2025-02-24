import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from 'react-oauth2-code-pkce';
import { logoutRequest, refreshAccessToken } from '@/api/authentication.ts';

const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const [decodedToken, setDecodedToken] = useState<{ sub?: string; userId?: string } | null>(null);

  const decodeToken = (token: string | undefined) => {
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const refreshTimeout = useRef<number | undefined>(undefined);

  const scheduleTokenRefresh = () =>  {
    let expiresAt: number | null = null;

    const tokenExpire = localStorage.getItem('ROCP_tokenExpire');

    if (tokenExpire) {
      expiresAt = parseInt(tokenExpire, 10) * 1000;
    } else if (auth.token) {
      const decoded = decodeToken(auth.token);
      if (decoded && decoded.exp) {
        expiresAt = decoded.exp * 1000;
      }
    }

    if (!expiresAt) return;

    const tokenTTL = expiresAt - Date.now();
    const oneMinute = 60 * 1000;

    if (tokenTTL <= oneMinute) {
      refreshAccessToken();
    } else {
      if (refreshTimeout.current) {
        window.clearTimeout(refreshTimeout.current);
      }
      refreshTimeout.current = window.setTimeout(() => {
        refreshAccessToken();
      }, tokenTTL - oneMinute);
    }
  };

  useEffect(() => {
    setDecodedToken(decodeToken(auth.idToken));
  }, [auth.idToken]);

  useEffect(() => {
    scheduleTokenRefresh();
  }, [auth.token]);

  const logout = async () => {
    if (refreshTimeout.current) {
      window.clearTimeout(refreshTimeout.current);
      refreshTimeout.current = undefined;
    }
    await logoutRequest();
  };

  return {
    isAuthenticated: !!auth.token,
    login: auth.logIn,
    logOut: logout,
    token: auth.token,
    error: auth.error,
    username: decodedToken?.sub,
    userId: decodedToken?.userId,
  };
};

export default useAuth;
