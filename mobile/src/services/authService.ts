import { apiClient, storeToken, removeToken } from './apiClient';
import type {
  ApiResponse,
  LoginRequest,
  LoginResponseData,
  RegisterRequest,
  RegisterResponseData,
} from '../types/api';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponseData> => {
    const response = await apiClient.post<ApiResponse<LoginResponseData>>(
      'auth/login',
      credentials,
    );
    const { jwtToken } = response.data.data;
    await storeToken(jwtToken);
    return response.data.data;
  },

  register: async (userData: RegisterRequest): Promise<RegisterResponseData> => {
    const response = await apiClient.post<ApiResponse<RegisterResponseData>>(
      'auth/register',
      userData,
    );
    return response.data.data;
  },

  logout: async (): Promise<void> => {
    await removeToken();
  },
};