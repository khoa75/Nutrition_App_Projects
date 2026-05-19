import { create } from 'zustand';
import { getToken, removeToken } from '../services/apiClient';
import { authApi } from '../services/authService';
import type { LoginRequest, RegisterRequest, RegisterResponseData } from '../types/api';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;

  initialize: () => Promise<void>;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<RegisterResponseData>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,

  initialize: async () => {
    try {
      const storedToken = await getToken();
      if (storedToken) {
        set({ token: storedToken, isAuthenticated: true, isInitialized: true });
      } else {
        set({ isInitialized: true });
      }
    } catch {
      set({ isInitialized: true });
    }
  },

  login: async (credentials: LoginRequest) => {
    set({ isLoading: true });
    try {
      const data = await authApi.login(credentials);
      set({
        token: data.jwtToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (userData: RegisterRequest) => {
    set({ isLoading: true });
    try {
      const data = await authApi.register(userData);
      set({ isLoading: false });
      return data;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    await removeToken();
    set({ token: null, isAuthenticated: false });
  },
}));
