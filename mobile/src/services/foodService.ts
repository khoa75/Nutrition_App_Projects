import { apiClient } from './apiClient';
import type { ApiResponse } from '../types/api';

export interface FoodResponseData {
  id: number;
  name: string;
  protein: number;
  carbs: number;
  fats: number;
  caloriesPer100g: number;
  userId: number | null;
}

export interface CreateFoodRequestData {
  name: string;
  protein: number;
  carbs: number;
  fats: number;
  caloriesPer100g: number;
  userId?: number | null;
}

export const foodService = {
  createFood: async (data: CreateFoodRequestData): Promise<FoodResponseData> => {
    const response = await apiClient.post<ApiResponse<FoodResponseData>>('foods', data);
    return response.data.data;
  },
};
