import api from '@/config/axios/config';
import { LoginInResponse, RegisterBody } from '@/types/auth';

export enum Auth_Endpoint {
	LOGIN = 'api/auth/authenticate',
	REGISTER = 'api/auth/register',
}

export const login = async (username: string, password: string, stayLoggedIn: boolean): Promise<void> => {
	const basicAuthHeader = btoa(`${username}:${password}`);
	const config = { headers: { Authorization: 'Basic ' + basicAuthHeader } };

	const response = await api.get(Auth_Endpoint.LOGIN, config);
	const data: LoginInResponse = response.data;

	if (stayLoggedIn) {
		localStorage.setItem('token', data.token);
	} else {
		sessionStorage.setItem('token', data.token);
	}
};

export const register = async (username: string, password: string, email: string): Promise<void> => {
	const requestBody: RegisterBody = {
		username: username,
		password: password,
		email: email,
	};
	await api.post(Auth_Endpoint.REGISTER, requestBody);
};
