import { adminAuthService, ApiResponse } from './adminAuthService';

export interface AdminUserSummary {
  id: number;
  name: string;
  email: string;
  status: 'ACTIVE' | 'LOCK';
  goalType: string | null;
}

export interface FoodResponse {
  id: number;
  name: string;
  protein: number;
  carbs: number;
  fats: number;
  caloriesPer100g: number;
  userId: number | null;
}

export interface CreateFoodRequest {
  name: string;
  protein: number;
  carbs: number;
  fats: number;
  caloriesPer100g: number;
  userId: number | null;
}

export class AdminUserService {
  async getAllUsers(): Promise<AdminUserSummary[]> {
    try {
      const response = await adminAuthService.apiClient.get<ApiResponse<AdminUserSummary[]>>('/admin/users/all');
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch users');
    }
  }

  async getAllFoods(): Promise<FoodResponse[]> {
    try {
      const response = await adminAuthService.apiClient.get<ApiResponse<FoodResponse[]>>('/admin/users/foods');
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch foods');
    }
  }

  async updateUserStatus(userId: number | string, action: 'LOCK' | 'UNLOCK'): Promise<{ userId: number; status: 'ACTIVE' | 'LOCK' }> {
    try {
      const response = await adminAuthService.apiClient.post<ApiResponse<any>>(`/admin/users/${userId}/status`, { action });
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update user status');
    }
  }

  async createFood(food: CreateFoodRequest): Promise<FoodResponse> {
    try {
      const response = await adminAuthService.apiClient.post<ApiResponse<FoodResponse>>('/foods', food);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create food');
    }
  }

  async updateFood(foodId: number, food: CreateFoodRequest): Promise<FoodResponse> {
    try {
      const response = await adminAuthService.apiClient.put<ApiResponse<FoodResponse>>(`/foods/${foodId}`, food);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update food');
    }
  }
}

export const adminUserService = new AdminUserService();

