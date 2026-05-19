package com.example.backend.service.impl;

import com.example.backend.dto.request.DailyCaloriePlanRequest;
import com.example.backend.dto.response.DailyCaloriePlanResponse;
import com.example.backend.enums.WeightGoal;
import com.example.backend.service.NutritionPlanService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class NutritionPlanServiceImpl implements NutritionPlanService {

    private static final int DEFAULT_CALORIE_DELTA = 500;
    private static final int MIN_TARGET_CALORIES = 1200;

    @Override
    public DailyCaloriePlanResponse calculateDailyTarget(DailyCaloriePlanRequest request) {
        int tdee = request.getTdee().setScale(0, java.math.RoundingMode.HALF_UP).intValue();
        int calorieDelta = switch (request.getGoalType()) {
            case MAINTAIN -> 0;
            case GAIN, LOSE -> DEFAULT_CALORIE_DELTA;
        };

        int targetCalories = calculateTargetCalories(tdee, request.getGoalType(), calorieDelta);

        return DailyCaloriePlanResponse.builder()
                .goalType(request.getGoalType())
                .calorieDelta(calorieDelta)
                .targetCalories(targetCalories)
                .build();
    }

    private int calculateTargetCalories(int tdee, WeightGoal goalType, int calorieDelta) {
        int result = switch (goalType) {
            case MAINTAIN -> tdee;
            case GAIN -> tdee + calorieDelta;
            case LOSE -> tdee - calorieDelta;
        };

        return Math.max(result, MIN_TARGET_CALORIES);
    }
}
