package com.example.backend.controller;

import com.example.backend.dto.request.DailyCaloriePlanRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.DailyCaloriePlanResponse;
import com.example.backend.dto.response.DailyPlanItemResponse;
import com.example.backend.dto.response.PlanRangeResponse;
import com.example.backend.enums.ErrorCode;
import com.example.backend.exception.AppException;
import com.example.backend.service.NutritionPlanService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.time.LocalDate;
import java.time.YearMonth;

@Validated
@RestController
@RequestMapping("/api/nutrition-plans")
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

    @GetMapping("/daily")
    public ApiResponse<DailyPlanItemResponse> getDailyPlan(
            Principal principal,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        LocalDate targetDate = date != null ? date : LocalDate.now();
        DailyPlanItemResponse response = nutritionPlanService.getDailyPlan(requireEmail(principal), targetDate);

        return ApiResponse.<DailyPlanItemResponse>builder()
                .message("Get daily plan success")
                .data(response)
                .build();
    }

    @GetMapping("/weekly")
    public ApiResponse<PlanRangeResponse> getWeeklyPlan(
            Principal principal,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate) {
        PlanRangeResponse response = nutritionPlanService.getWeeklyPlan(requireEmail(principal), startDate);

        return ApiResponse.<PlanRangeResponse>builder()
                .message("Get weekly plan success")
                .data(response)
                .build();
    }

    @GetMapping("/monthly")
    public ApiResponse<PlanRangeResponse> getMonthlyPlan(
            Principal principal,
            @RequestParam @Min(2000) int year,
            @RequestParam @Min(1) @Max(12) int month) {
        PlanRangeResponse response = nutritionPlanService.getMonthlyPlan(requireEmail(principal), YearMonth.of(year, month));

        return ApiResponse.<PlanRangeResponse>builder()
                .message("Get monthly plan success")
                .data(response)
                .build();
    }

    private String requireEmail(Principal principal) {
        if (principal == null || principal.getName() == null || principal.getName().isBlank()) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        return principal.getName();
    }
}
