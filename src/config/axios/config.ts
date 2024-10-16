import axios, { type AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	timeout: 5000,
});

export default api;
