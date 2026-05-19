import axios, { AxiosInstance } from 'axios';

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AdminUser;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export class AdminAuthService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to add auth token
    this.apiClient.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
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
          
          const refreshToken = this.getRefreshToken();
          if (refreshToken) {
            try {
              const newTokens = await this.refreshToken(refreshToken);
              this.setAuthToken(newTokens.accessToken);
              this.setRefreshToken(newTokens.refreshToken);
              
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
              }
              
              return this.apiClient(originalRequest);
            } catch (refreshError) {
              this.clearAuth();
              window.location.href = '/login';
              return Promise.reject(new Error('Session expired. Please login again.'));
            }
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  // Authentication Methods
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await this.apiClient.post<ApiResponse<LoginResponse>>('/auth/admin/login', credentials);
      
      if (response.data.data.accessToken && response.data.data.refreshToken) {
        this.setAuthToken(response.data.data.accessToken);
        this.setRefreshToken(response.data.data.refreshToken);
      }
      
      return response.data.data;
    } catch (error: any) {
      this.handleApiError(error, 'Login failed');
    }
  }

  async logout(): Promise<void> {
    try {
      // Call logout endpoint
      await this.apiClient.post('/auth/admin/logout');
    } catch (error) {
      // Ignore errors during logout API call
      console.warn('Logout API call failed:', error);
    } finally {
      this.clearAuth();
      window.location.href = '/login';
    }
  }

  // Token Management
  private setAuthToken(token: string): void {
    localStorage.setItem('admin_access_token', token);
  }

  private setRefreshToken(token: string): void {
    localStorage.setItem('admin_refresh_token', token);
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('admin_access_token');
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem('admin_refresh_token');
  }

  private clearAuth(): void {
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_refresh_token');
  }

  // Session Management
  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    if (!token) {
      return false;
    }
    
    // Validate token is not expired
    return this.validateToken(token);
  }

  validateToken(token: string): boolean {
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

  // User Profile
  async getCurrentUser(): Promise<AdminUser> {
    try {
      const response = await this.apiClient.get<ApiResponse<AdminUser>>('/admin/users/me');
      return response.data.data;
    } catch (error: any) {
      this.handleApiError(error, 'Failed to get user profile');
    }
  }

  // Token Refresh
  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const response = await this.apiClient.post<ApiResponse<{ accessToken: string; refreshToken: string }>>(
        '/auth/admin/refresh',
        { refreshToken }
      );
      return response.data.data;
    } catch (error: any) {
      this.handleApiError(error, 'Token refresh failed');
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
        case 404:
          throw new Error(data.message || 'Resource not found');
        case 422:
          throw new Error(data.message || 'Validation failed');
        case 429:
          throw new Error(data.message || 'Too many requests');
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

  // Password validation
  validatePassword(password: string): boolean {
    // Password must be at least 8 characters long
    // and contain at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  // Email validation
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Export singleton instance
export const adminAuthService = new AdminAuthService();