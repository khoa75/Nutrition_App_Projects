package com.nutrition.userprofile.dto;

import java.time.LocalDate;

public record ProfileUpdateRequest(
        LocalDate dob,
        String gender,
        Double heightCm,
        Double weightKg,
        String activityLevel,
        String goalType,
        Double targetWeightKg
) {}
