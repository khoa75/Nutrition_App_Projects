package com.nutrition.userprofile.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record HealthMetricsRequest(
        @NotNull @Positive double heightCm,
        @NotNull @Positive double weightKg,
        @NotNull @Positive int age,
        @NotBlank String gender,
        @NotBlank String activityLevel
) {}
