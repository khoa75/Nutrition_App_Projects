package com.example.backend.service;

import com.example.backend.dto.request.DailyCaloriePlanRequest;
import com.example.backend.dto.response.DailyCaloriePlanResponse;
import com.example.backend.dto.response.DailyPlanItemResponse;
import com.example.backend.dto.response.PlanRangeResponse;

import java.time.LocalDate;
import java.time.YearMonth;

public interface NutritionPlanService {
    DailyCaloriePlanResponse calculateDailyTarget(DailyCaloriePlanRequest request);

    DailyPlanItemResponse getDailyPlan(String email, LocalDate date);

    PlanRangeResponse getWeeklyPlan(String email, LocalDate startDate);

    PlanRangeResponse getMonthlyPlan(String email, YearMonth yearMonth);
}
