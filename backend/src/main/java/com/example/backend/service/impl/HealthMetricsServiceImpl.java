package com.example.backend.service.impl;

import com.example.backend.enums.ActivityLevelEnum;
import com.example.backend.enums.BmiStatusEnum;
import com.example.backend.enums.WeightGoal;
import com.example.backend.service.HealthMetricsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Locale;

@Service
public class HealthMetricsServiceImpl implements HealthMetricsService {

    private static final Logger logger = LoggerFactory.getLogger(HealthMetricsServiceImpl.class);

    @Override
    public BigDecimal calculateBmi(BigDecimal currentWeightKg, BigDecimal heightCm) {
        if (currentWeightKg == null || heightCm == null || currentWeightKg.compareTo(BigDecimal.ZERO) <= 0 || heightCm.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Weight and height must be greater than zero");
        }

        BigDecimal heightMeter = heightCm.divide(BigDecimal.valueOf(100), 6, RoundingMode.HALF_UP);
        BigDecimal bmi = currentWeightKg.divide(heightMeter.multiply(heightMeter), 2, RoundingMode.HALF_UP);
        return bmi;
    }

    @Override
    public BmiStatusEnum classifyBmi(BigDecimal bmi) {
        if (bmi == null) {
            throw new IllegalArgumentException("BMI must not be null");
        }
        if (bmi.compareTo(new BigDecimal("18.50")) < 0) return BmiStatusEnum.UNDERWEIGHT;
        if (bmi.compareTo(new BigDecimal("25.00")) < 0) return BmiStatusEnum.NORMAL;
        if (bmi.compareTo(new BigDecimal("30.00")) < 0) return BmiStatusEnum.OVERWEIGHT;
        if (bmi.compareTo(new BigDecimal("35.00")) < 0) return BmiStatusEnum.OBESITY_LEVEL_1;
        return BmiStatusEnum.OBESITY_LEVEL_2;
    }

    @Override
    public BigDecimal calculateGoalCalories(BigDecimal currentWeightKg, BigDecimal heightCm, int age, String gender,
                                            ActivityLevelEnum activityLevel, WeightGoal goalType, BigDecimal kgPerWeek) {
        if (currentWeightKg == null || heightCm == null || activityLevel == null || goalType == null || kgPerWeek == null) {
            throw new IllegalArgumentException("Input must not be null");
        }
        if (gender == null || gender.isBlank()) {
            throw new IllegalArgumentException("Gender must not be blank");
        }
        if (currentWeightKg.compareTo(BigDecimal.ZERO) <= 0 || heightCm.compareTo(BigDecimal.ZERO) <= 0 || age <= 0) {
            throw new IllegalArgumentException("Weight, height, age must be greater than zero");
        }

        BigDecimal bmrBase = BigDecimal.valueOf(10).multiply(currentWeightKg)
                .add(BigDecimal.valueOf(6.25).multiply(heightCm))
                .subtract(BigDecimal.valueOf(5L * age));
        String normalizedGender = gender.trim().toUpperCase(Locale.ROOT);
        if (!"MALE".equals(normalizedGender) && !"FEMALE".equals(normalizedGender)) {
            throw new IllegalArgumentException("Gender must be MALE or FEMALE");
        }

        BigDecimal bmr = "FEMALE".equals(normalizedGender)
                ? bmrBase.subtract(BigDecimal.valueOf(161))
                : bmrBase.add(BigDecimal.valueOf(5));

        BigDecimal activityFactor = switch (activityLevel) {
            case SEDENTARY -> BigDecimal.valueOf(1.2);
            case LIGHT_ACTIVE -> BigDecimal.valueOf(1.375);
            case ACTIVE -> BigDecimal.valueOf(1.725);
            case VERY_ACTIVE -> BigDecimal.valueOf(1.9);
        };

        BigDecimal tdee = bmr.multiply(activityFactor);
        BigDecimal adjustment = kgPerWeek.multiply(BigDecimal.valueOf(7700)).divide(BigDecimal.valueOf(7), 2, RoundingMode.HALF_UP);

        BigDecimal goalCalories = switch (goalType) {
            case MAINTAIN -> tdee;
            case LOSE -> tdee.subtract(adjustment);
            case GAIN -> tdee.add(adjustment);
        };

        BigDecimal result = goalCalories.setScale(2, RoundingMode.HALF_UP);
        logger.debug("Calculated goal calories={} for age={}, activityLevel={}, goalType={}", result, age, activityLevel, goalType);
        return result;
    }
}
