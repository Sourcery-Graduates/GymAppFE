import api from '@/config/axios/config';

export enum Auth_Endpoint {
	LOGIN = 'api/auth/authenticate',
	REGISTER = 'api/auth/register',
}

interface LoginInResponse {
	token: string;
}

export const login = async (username: string, password: string, stayLoggedIn: boolean): Promise<void> => {
	const basicAuthHeader = btoa(`${username}:${password}`);
	const config = { headers: { Authorization: 'Basic ' + basicAuthHeader } };

	const response = await api.get(Auth_Endpoint.LOGIN, config);
	console.log(response);
	const data: LoginInResponse = response.data;

	if (stayLoggedIn) {
		localStorage.setItem('token', data.token);
	} else {
		sessionStorage.setItem('token', data.token);
	}
};

interface RegisterBody {
	username: string;
	password: string;
	email: string;
}

export const register = async (username: string, password: string, email: string): Promise<void> => {
	const requestBody: RegisterBody = {
		username: username,
		password: password,
		email: email,
	};
	console.log(requestBody);
	await api.post(Auth_Endpoint.REGISTER, requestBody);
};
