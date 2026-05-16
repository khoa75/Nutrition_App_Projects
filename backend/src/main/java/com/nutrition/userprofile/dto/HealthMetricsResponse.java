package com.nutrition.userprofile.dto;

public record HealthMetricsResponse(
        double bmi,
        double bmr,
        double tdee,
        String bmiCategory
) {}
