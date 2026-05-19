// Generic API response wrapper matching backend ApiResponse<T>
export interface ApiResponse<T> {
  message: string;
  data: T;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponseData {
  jwtToken: string;
  refreshToken: string;
  accessTokenExpiresInSeconds: number;
  refreshTokenExpiresInSeconds: number;
  tokenType: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponseData {
  id: number;
  name: string;
  email: string;
  status: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  status: string;
}
