package com.nutrition.userprofile.service;

import com.nutrition.userprofile.model.ActivityLevel;
import com.nutrition.userprofile.model.BmiCategory;
import com.nutrition.userprofile.model.Gender;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Component
public class UserProfileMetricCalculator {

    public BigDecimal calculateBmi(BigDecimal weightKg, BigDecimal heightCm) {
        validatePositive(weightKg, "weightKg");
        validatePositive(heightCm, "heightCm");

        BigDecimal heightMeter = heightCm.divide(BigDecimal.valueOf(100), 10, RoundingMode.HALF_UP);
        BigDecimal bmi = weightKg.divide(heightMeter.multiply(heightMeter), 10, RoundingMode.HALF_UP);
        return bmi.setScale(2, RoundingMode.HALF_UP);
    }

    public BmiCategory classifyBmi(BigDecimal bmi) {
        validatePositive(bmi, "bmi");

        if (bmi.compareTo(BigDecimal.valueOf(18.5)) < 0) {
            return BmiCategory.UNDERWEIGHT;
        }
        if (bmi.compareTo(BigDecimal.valueOf(25.0)) < 0) {
            return BmiCategory.NORMAL;
        }
        if (bmi.compareTo(BigDecimal.valueOf(30.0)) < 0) {
            return BmiCategory.OVERWEIGHT;
        }
        return BmiCategory.OBESE;
    }

    public BigDecimal calculateBmr(BigDecimal weightKg, BigDecimal heightCm, int age, Gender gender) {
        validatePositive(weightKg, "weightKg");
        validatePositive(heightCm, "heightCm");
        if (age <= 0) {
            throw new IllegalArgumentException("age must be greater than 0");
        }
        if (gender == null) {
            throw new IllegalArgumentException("gender is required");
        }

        BigDecimal base = BigDecimal.valueOf(10).multiply(weightKg)
                .add(BigDecimal.valueOf(6.25).multiply(heightCm))
                .subtract(BigDecimal.valueOf(5L * age));

        BigDecimal bmr = gender == Gender.MALE
                ? base.add(BigDecimal.valueOf(5))
                : base.subtract(BigDecimal.valueOf(161));

        return bmr.setScale(2, RoundingMode.HALF_UP);
    }

    public BigDecimal calculateTdee(BigDecimal bmr, ActivityLevel activityLevel) {
        validatePositive(bmr, "bmr");
        if (activityLevel == null) {
            throw new IllegalArgumentException("activityLevel is required");
        }

        BigDecimal factor = switch (activityLevel) {
            case SEDENTARY -> BigDecimal.valueOf(1.2);
            case LIGHT_ACTIVE -> BigDecimal.valueOf(1.55);
            case ACTIVE -> BigDecimal.valueOf(1.725);
        };

        return bmr.multiply(factor).setScale(2, RoundingMode.HALF_UP);
    }

    private void validatePositive(BigDecimal value, String fieldName) {
        if (value == null || value.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException(fieldName + " must be greater than 0");
        }
    }
}
