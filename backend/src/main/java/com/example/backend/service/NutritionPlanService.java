package com.example.backend.service;

import com.example.backend.dto.request.DailyCaloriePlanRequest;
import com.example.backend.dto.response.DailyCaloriePlanResponse;

public interface NutritionPlanService {
    DailyCaloriePlanResponse calculateDailyTarget(DailyCaloriePlanRequest request);
}
