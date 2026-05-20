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
  phone: string;
  password: string;
  dob: string;
  gender: 'MALE' | 'FEMALE';
  currentWeight: number;
  targetWeight: number;
  height: number;
  activityLevel: 'SEDENTARY' | 'LIGHT_ACTIVE' | 'ACTIVE' | 'VERY_ACTIVE';
  goalType: 'LOSE' | 'MAINTAIN' | 'GAIN';
  kgPerWeek: number;
}

export interface RegisterResponseData {
  userId: number;
  email: string;
  phone: string;
  goalCaloriesDaily: number;
  goalCaloriesWeekly: number;
  message: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  status: string;
}
