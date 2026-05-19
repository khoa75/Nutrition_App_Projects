import { apiClient } from './apiClient';
import type { ApiResponse } from '../types/api';

export interface UserProfileData {
  name: string;
  email: string;
  dob: string | null; // format: YYYY-MM-DD
  gender: string; // MALE, FEMALE, OTHER
  currentWeight: number;
  targetWeight: number;
  height: number;
  activityLevel: 'SEDENTARY' | 'LIGHT_ACTIVE' | 'ACTIVE' | 'VERY_ACTIVE';
  goalType: 'LOSE' | 'MAINTAIN' | 'GAIN';
  kgPerWeek: number;
  bmi: number;
  bmiStatus: string;
  goalCalories: number;
}

export interface GoalCaloriesRequestData {
  currentWeight: number;
  targetWeight: number;
  height: number;
  gender: string;
  activityLevel: 'SEDENTARY' | 'LIGHT_ACTIVE' | 'ACTIVE' | 'VERY_ACTIVE';
  goalType: 'LOSE' | 'MAINTAIN' | 'GAIN';
  kgPerWeek: number;
}

export const userService = {
  getUserProfile: async (): Promise<UserProfileData> => {
    const response = await apiClient.get<ApiResponse<UserProfileData>>('users/me');
    return response.data.data;
  },

  updateGoalCalories: async (data: GoalCaloriesRequestData): Promise<{ goalCalories: number }> => {
    const response = await apiClient.put<ApiResponse<{ goalCalories: number }>>(
      'users/me/goal-calories',
      data,
    );
    return response.data.data;
  },

  updateProfile: async (data: any): Promise<UserProfileData> => {
    const response = await apiClient.put<ApiResponse<UserProfileData>>(
      'users/me/profile',
      data,
    );
    return response.data.data;
  },
};
