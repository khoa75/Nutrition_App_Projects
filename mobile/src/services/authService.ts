import axios, { AxiosInstance } from 'axios';
import * as SecureStore from 'expo-secure-store';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  status: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  dob: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export class AuthStorageService {
  private apiClient: AxiosInstance;
  private readonly TOKEN_KEY = 'nutrition_app_tokens';
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  constructor(apiClient?: AxiosInstance) {
    this.apiClient = apiClient || axios.create({
      baseURL: 'http://localhost:8080/api/v1',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to add auth token
    this.apiClient.interceptors.request.use(
      async (config) => {
        const tokens = await this.getStoredTokens();
        if (tokens && config.headers) {
          config.headers.Authorization = `Bearer ${tokens.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for token refresh
    this.apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          const tokens = await this.getStoredTokens();
          if (tokens) {
            try {
              const newTokens = await this.refreshToken(tokens.refreshToken);
              await this.storeTokens(newTokens);
              
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
              }
              
              return this.apiClient(originalRequest);
            } catch (refreshError) {
              await this.logout();
              throw new Error('Session expired. Please login again.');
            }
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  // Authentication Methods
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await this.apiClient.post<AuthResponse>('/auth/login', credentials);
      
      if (response.data.accessToken && response.data.refreshToken) {
        await this.storeTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken
        });
      }
      
      return response.data;
    } catch (error: any) {
      this.handleApiError(error, 'Login failed');
    }
  }

  async register(userData: RegisterRequest): Promise<User> {
    try {
      // Validate input
      this.validateRegistrationData(userData);
      
      const response = await this.apiClient.post<User>('/auth/register', userData);
      return response.data;
    } catch (error: any) {
      this.handleApiError(error, 'Registration failed');
    }
  }

  async logout(): Promise<void> {
    try {
      // Clear tokens from storage
      await SecureStore.deleteItemAsync(this.ACCESS_TOKEN_KEY);
      await SecureStore.deleteItemAsync(this.REFRESH_TOKEN_KEY);
      
      // Optionally call logout endpoint
      try {
        await this.apiClient.post('/auth/logout');
      } catch (error) {
        // Ignore errors during logout API call
        console.warn('Logout API call failed:', error);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }

  // Token Management
  async storeTokens(tokens: Tokens): Promise<void> {
    try {
      await SecureStore.setItemAsync(this.ACCESS_TOKEN_KEY, tokens.accessToken);
      await SecureStore.setItemAsync(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
    } catch (error) {
      console.error('Error storing tokens:', error);
      throw new Error('Failed to store authentication tokens');
    }
  }

  async getStoredTokens(): Promise<Tokens | null> {
    try {
      const accessToken = await SecureStore.getItemAsync(this.ACCESS_TOKEN_KEY);
      const refreshToken = await SecureStore.getItemAsync(this.REFRESH_TOKEN_KEY);
      
      if (accessToken && refreshToken) {
        return {
          accessToken,
          refreshToken
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error retrieving tokens:', error);
      return null;
    }
  }

  async refreshToken(refreshToken: string): Promise<Tokens> {
    try {
      const response = await this.apiClient.post<Tokens>('/auth/refresh', {
        refreshToken
      });
      return response.data;
    } catch (error: any) {
      this.handleApiError(error, 'Token refresh failed');
    }
  }

  // Session Management
  async isAuthenticated(): Promise<boolean> {
    try {
      const tokens = await this.getStoredTokens();
      if (!tokens) {
        return false;
      }
      
      // Validate token is not expired
      return await this.validateToken(tokens.accessToken);
    } catch (error) {
      return false;
    }
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      // Simple validation - check if token exists and is not empty
      if (!token || token.trim() === '') {
        return false;
      }
      
      // Additional validation can be added here (e.g., JWT decoding)
      return true;
    } catch (error) {
      return false;
    }
  }

  // Validation Methods
  validatePassword(password: string): boolean {
    // Password must be at least 8 characters long
    // and contain at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateRegistrationData(data: RegisterRequest): void {
    if (!data.name || data.name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }
    
    if (!this.validateEmail(data.email)) {
      throw new Error('Invalid email format');
    }
    
    if (!this.validatePassword(data.password)) {
      throw new Error('Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character');
    }
    
    if (!data.dob) {
      throw new Error('Date of birth is required');
    }
    
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(data.dob)) {
      throw new Error('Date of birth must be in YYYY-MM-DD format');
    }
  }

  // Error Handling
  private handleApiError(error: any, defaultMessage: string): never {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          throw new Error(data.message || 'Invalid request data');
        case 401:
          throw new Error(data.message || 'Invalid credentials');
        case 403:
          throw new Error(data.message || 'Access denied');
        case 409:
          throw new Error(data.message || 'User already exists');
        case 422:
          throw new Error(data.message || 'Validation failed');
        case 500:
          throw new Error('Internal server error');
        default:
          throw new Error(data.message || defaultMessage);
      }
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      throw new Error(defaultMessage);
    }
  }

  // Utility Methods
  async clearUserData(): Promise<void> {
    try {
      await this.logout();
      // Add any other user data cleanup here
    } catch (error) {
      console.error('Error clearing user data:', error);
      throw error;
    }
  }

  async getUserProfile(): Promise<User> {
    try {
      const response = await this.apiClient.get<User>('/users/me');
      return response.data;
    } catch (error: any) {
      this.handleApiError(error, 'Failed to get user profile');
    }
  }
}

// Export singleton instance
export const authService = new AuthStorageService();