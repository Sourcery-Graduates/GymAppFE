import axios, { type AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
});

export const getToken = (): string | null => {
  let token = localStorage.getItem('ROCP_token') ?? sessionStorage.getItem('ROCP_token');
  if (token?.startsWith('"') && token?.endsWith('"')) {
    token = token.slice(1, -1);
  }
  return token || null;
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

const excludeUrl = (configUrl: string | undefined): boolean =>  {
  const excludedPaths = ['oauth2', 'api/auth'];
  return excludedPaths.some(path => configUrl?.includes(path));
};

export default api;
