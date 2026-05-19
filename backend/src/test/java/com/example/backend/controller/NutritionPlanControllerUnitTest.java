package com.example.backend.controller;

import com.example.backend.dto.request.DailyCaloriePlanRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.DailyCaloriePlanResponse;
import com.example.backend.dto.response.DailyPlanItemResponse;
import com.example.backend.dto.response.PlanRangeResponse;
import com.example.backend.enums.WeightGoal;
import com.example.backend.service.NutritionPlanService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
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

    @Test
    void getDailyPlan_ShouldWrapInApiResponse() {
        NutritionPlanService nutritionPlanService = Mockito.mock(NutritionPlanService.class);
        NutritionPlanController controller = new NutritionPlanController(nutritionPlanService);
        Principal principal = () -> "john@example.com";

        DailyPlanItemResponse payload = DailyPlanItemResponse.builder()
                .planDate(LocalDate.of(2026, 5, 20))
                .targetCalories(2200)
                .build();
        when(nutritionPlanService.getDailyPlan("john@example.com", LocalDate.of(2026, 5, 20))).thenReturn(payload);

        ApiResponse<DailyPlanItemResponse> response = controller.getDailyPlan(principal, LocalDate.of(2026, 5, 20));

        assertTrue(response.isSuccess());
        assertEquals("Get daily plan success", response.getMessage());
        assertEquals(2200, response.getData().getTargetCalories());
    }

    @Test
    void getDailyPlan_ShouldDefaultToToday_WhenDateMissing() {
        NutritionPlanService nutritionPlanService = Mockito.mock(NutritionPlanService.class);
        NutritionPlanController controller = new NutritionPlanController(nutritionPlanService);
        Principal principal = () -> "john@example.com";

        DailyPlanItemResponse payload = DailyPlanItemResponse.builder()
                .planDate(LocalDate.now())
                .targetCalories(2200)
                .build();
        when(nutritionPlanService.getDailyPlan(eq("john@example.com"), any(LocalDate.class))).thenReturn(payload);

        ApiResponse<DailyPlanItemResponse> response = controller.getDailyPlan(principal, null);

        assertTrue(response.isSuccess());
        assertEquals("Get daily plan success", response.getMessage());
        assertEquals(2200, response.getData().getTargetCalories());
    }

    @Test
    void getWeeklyPlan_ShouldWrapInApiResponse() {
        NutritionPlanService nutritionPlanService = Mockito.mock(NutritionPlanService.class);
        NutritionPlanController controller = new NutritionPlanController(nutritionPlanService);
        Principal principal = () -> "john@example.com";

        PlanRangeResponse payload = PlanRangeResponse.builder()
                .plans(List.of(DailyPlanItemResponse.builder().planDate(LocalDate.of(2026, 5, 20)).build()))
                .build();
        when(nutritionPlanService.getWeeklyPlan("john@example.com", LocalDate.of(2026, 5, 20))).thenReturn(payload);

        ApiResponse<PlanRangeResponse> response = controller.getWeeklyPlan(principal, LocalDate.of(2026, 5, 20));

        assertTrue(response.isSuccess());
        assertEquals("Get weekly plan success", response.getMessage());
        assertEquals(1, response.getData().getPlans().size());
    }

    @Test
    void getMonthlyPlan_ShouldWrapInApiResponse() {
        NutritionPlanService nutritionPlanService = Mockito.mock(NutritionPlanService.class);
        NutritionPlanController controller = new NutritionPlanController(nutritionPlanService);
        Principal principal = () -> "john@example.com";

        PlanRangeResponse payload = PlanRangeResponse.builder()
                .plans(List.of())
                .build();
        when(nutritionPlanService.getMonthlyPlan("john@example.com", YearMonth.of(2026, 5))).thenReturn(payload);

        ApiResponse<PlanRangeResponse> response = controller.getMonthlyPlan(principal, 2026, 5);

        assertTrue(response.isSuccess());
        assertEquals("Get monthly plan success", response.getMessage());
        assertEquals(0, response.getData().getPlans().size());
    }
}
