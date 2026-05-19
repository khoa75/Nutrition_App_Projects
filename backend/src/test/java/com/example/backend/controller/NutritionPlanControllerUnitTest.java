package com.example.backend.controller;

import com.example.backend.dto.request.DailyCaloriePlanRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.DailyCaloriePlanResponse;
import com.example.backend.enums.WeightGoal;
import com.example.backend.service.NutritionPlanService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class NutritionPlanControllerUnitTest {

    @Test
    void calculateDailyTarget_ShouldWrapInApiResponse() {
        NutritionPlanService nutritionPlanService = Mockito.mock(NutritionPlanService.class);
        NutritionPlanController controller = new NutritionPlanController(nutritionPlanService);

        DailyCaloriePlanResponse payload = DailyCaloriePlanResponse.builder()
                .goalType(WeightGoal.MAINTAIN)
                .targetCalories(2200)
                .calorieDelta(0)
                .build();
        when(nutritionPlanService.calculateDailyTarget(any(DailyCaloriePlanRequest.class))).thenReturn(payload);

        DailyCaloriePlanRequest request = DailyCaloriePlanRequest.builder()
                .tdee(BigDecimal.valueOf(2200))
                .goalType(WeightGoal.MAINTAIN)
                .build();

        ApiResponse<DailyCaloriePlanResponse> response = controller.calculateDailyTarget(request);

        assertTrue(response.isSuccess());
        assertEquals("Calculate daily target success", response.getMessage());
        assertEquals(2200, response.getData().getTargetCalories());
    }
}
