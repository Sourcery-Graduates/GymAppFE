import { AuthState } from '@/types/auth';
import { useQueryClient } from '@tanstack/react-query';
import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode, JwtPayload as DefaultJwtPayload } from 'jwt-decode';

interface JwtPayload extends DefaultJwtPayload {
  userId: string;
  username: string;
}

interface AuthContextProps {
  children?: React.ReactNode;
}
export const AuthContext = createContext<AuthState>({} as AuthState);

export const AuthContextProvider = ({ children }: AuthContextProps): JSX.Element => {
  const token = localStorage.getItem('token') ?? sessionStorage.getItem('token') ?? null;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(token !== null);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        setUserId(decodedToken.userId);
        setUsername(decodedToken.username)
      } catch (error) {
        console.error('Failed to decode JWT:', error);
      }
    }
  }, [token]);

  const logOutUser = (): void => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    queryClient.clear();
    setIsLoggedIn(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logOutUser, userId, username }}>{children}</AuthContext.Provider>
  );
};
