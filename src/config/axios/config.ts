import axios, { type AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
});

export const getToken = (): string | null => {
  return localStorage.getItem('token') ?? sessionStorage.getItem('token');
};

api.interceptors.request.use((config) => {
  if (!excludeUrl(config.url)) {
    const token = getToken();
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.error('Not found token in local storage, cant add authentication header');
    }
  }
  return config;
});

const excludeUrl = (configUrl: string | undefined): boolean => {
  const path = 'api/auth';
  return configUrl?.includes(path) ?? false;
};

export default api;
