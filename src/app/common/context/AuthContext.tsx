import { type AuthState } from '@/app/common/context/types';
import React, { createContext, useState } from 'react';

interface AuthContextProps {
	children?: React.ReactNode;
}
export const AuthContext = createContext<AuthState>({} as AuthState);

export const AuthContextProvider = ({ children }: AuthContextProps): JSX.Element => {
	const token = localStorage.getItem('token') ?? sessionStorage.getItem('token') ?? null;
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(token !== null);

	const logOutUser = (): void => {
		localStorage.removeItem('token');
		sessionStorage.removeItem('token');
		setIsLoggedIn(false);
	};

	return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logOutUser }}>{children}</AuthContext.Provider>;
};
