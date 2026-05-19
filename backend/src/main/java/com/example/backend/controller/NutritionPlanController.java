package com.example.backend.controller;

import com.example.backend.dto.request.DailyCaloriePlanRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.DailyCaloriePlanResponse;
import com.example.backend.service.NutritionPlanService;
import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("/api/v1/nutrition-plans")
public class NutritionPlanController {

    private final NutritionPlanService nutritionPlanService;

    public NutritionPlanController(NutritionPlanService nutritionPlanService) {
        this.nutritionPlanService = nutritionPlanService;
    }

    @PostMapping("/daily-target")
    public ApiResponse<DailyCaloriePlanResponse> calculateDailyTarget(@Valid @RequestBody DailyCaloriePlanRequest request) {
        DailyCaloriePlanResponse response = nutritionPlanService.calculateDailyTarget(request);

        return ApiResponse.<DailyCaloriePlanResponse>builder()
                .message("Calculate daily target success")
                .data(response)
                .build();
    }
}
