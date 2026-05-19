package com.example.backend.service;

import com.example.backend.enums.ActivityLevelEnum;
import com.example.backend.enums.BmiStatusEnum;
import com.example.backend.enums.WeightGoal;

import java.math.BigDecimal;

public interface HealthMetricsService {
    BigDecimal calculateBmi(BigDecimal currentWeightKg, BigDecimal heightCm);

    BmiStatusEnum classifyBmi(BigDecimal bmi);

    BigDecimal calculateGoalCalories(BigDecimal currentWeightKg,
                                     BigDecimal heightCm,
                                     int age,
                                     String gender,
                                     ActivityLevelEnum activityLevel,
                                     WeightGoal goalType,
                                     BigDecimal kgPerWeek);
}
