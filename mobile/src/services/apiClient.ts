import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'vitality_access_token';

export const apiClient = axios.create({
  baseURL: 'http://192.168.71.242:8080/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach Bearer token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: handle 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear stored token on unauthorized
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    }
    return Promise.reject(error);
  },
);

// Token storage helpers
export const storeToken = async (token: string): Promise<void> => {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
};

export const getToken = async (): Promise<string | null> => {
  return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
};

export const removeToken = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
};
