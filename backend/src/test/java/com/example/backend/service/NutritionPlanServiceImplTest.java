package com.example.backend.service;

import com.example.backend.dto.request.DailyCaloriePlanRequest;
import com.example.backend.enums.WeightGoal;
import com.example.backend.service.impl.NutritionPlanServiceImpl;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;

class NutritionPlanServiceImplTest {

    private final NutritionPlanServiceImpl nutritionPlanService = new NutritionPlanServiceImpl();

    @Test
    void calculateDailyTarget_ShouldReturnMaintainCalories() {
        DailyCaloriePlanRequest request = DailyCaloriePlanRequest.builder()
                .tdee(BigDecimal.valueOf(2200))
                .goalType(WeightGoal.MAINTAIN)
                .build();

        var response = nutritionPlanService.calculateDailyTarget(request);

        assertEquals(2200, response.getTargetCalories());
        assertEquals(0, response.getCalorieDelta());
    }

    @Test
    void calculateDailyTarget_ShouldReturnGainCalories() {
        DailyCaloriePlanRequest request = DailyCaloriePlanRequest.builder()
                .tdee(BigDecimal.valueOf(2200))
                .goalType(WeightGoal.GAIN)
                .build();

        var response = nutritionPlanService.calculateDailyTarget(request);

        assertEquals(2700, response.getTargetCalories());
        assertEquals(500, response.getCalorieDelta());
    }

    @Test
    void calculateDailyTarget_ShouldClampLowCalories_ForLoseGoal() {
        DailyCaloriePlanRequest request = DailyCaloriePlanRequest.builder()
                .tdee(BigDecimal.valueOf(1300))
                .goalType(WeightGoal.LOSE)
                .build();

        var response = nutritionPlanService.calculateDailyTarget(request);

        assertEquals(1200, response.getTargetCalories());
        assertEquals(500, response.getCalorieDelta());
    }
}
