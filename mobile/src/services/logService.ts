import { apiClient } from './apiClient';
import type { ApiResponse } from '../types/api';

export interface LogNutritionPreview {
  foodId: number;
  foodName: string;
  gram: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  loggedAt: string;
}

export interface LogResponseData {
  id: number;
  userId: number;
  foodId: number;
  foodName: string;
  gram: number;
  caloriesPer100g: number;
  protein: number;
  carbs: number;
  fats: number;
  totalCalories: number;
  goalCalories: number;
  remainingCalories: number;
  loggedAt: string;
}

export interface PageResponseData<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
}

export interface StatisticsResponseData {
  labels: string[];
  calories: number[];
  goals: number[];
}

export const logService = {
  previewLogByName: async (foodName: string, gram: number): Promise<LogNutritionPreview> => {
    const response = await apiClient.post<ApiResponse<LogNutritionPreview>>('logs/preview-by-name', {
      foodName,
      gram,
    });
    return response.data.data;
  },

  createLogByName: async (foodName: string, gram: number, loggedAt?: string): Promise<LogResponseData> => {
    const response = await apiClient.post<ApiResponse<LogResponseData>>('logs/by-name', {
      foodName,
      gram,
      loggedAt,
    });
    return response.data.data;
  },

  getLogs: async (
    userId: number,
    from: string,
    to: string,
    page: number = 0,
    size: number = 10
  ): Promise<PageResponseData<LogResponseData>> => {
    const response = await apiClient.get<ApiResponse<PageResponseData<LogResponseData>>>('logs', {
      params: { userId, from, to, page, size },
    });
    return response.data.data;
  },

  getWeeklyStatistics: async (userId: number, start: string): Promise<StatisticsResponseData> => {
    const response = await apiClient.get<ApiResponse<{ message: string; data: StatisticsResponseData }>>('statistic/weekly', {
      params: { userId, start },
    });
    // Backend returns ApiResponse<WeeklyStatisticsResponse> where WeeklyStatisticsResponse = { message, data: { labels, calories, goals } }
    return response.data.data.data;
  },

  getMonthlyStatistics: async (
    userId: number,
    year: number,
    month: number
  ): Promise<StatisticsResponseData> => {
    const response = await apiClient.get<ApiResponse<{ message: string; data: StatisticsResponseData }>>('statistic/monthly', {
      params: { userId, year, month },
    });
    // Backend returns ApiResponse<MonthlyStatisticsResponse> where MonthlyStatisticsResponse = { message, data: { labels, calories, goals } }
    return response.data.data.data;
  },

  updateLogGram: async (id: number, gram: number): Promise<LogResponseData> => {
    const response = await apiClient.put<ApiResponse<LogResponseData>>(`logs/${id}`, { gram });
    return response.data.data;
  },

  deleteLog: async (id: number): Promise<void> => {
    await apiClient.delete<ApiResponse<void>>(`logs/${id}`);
  },
};
