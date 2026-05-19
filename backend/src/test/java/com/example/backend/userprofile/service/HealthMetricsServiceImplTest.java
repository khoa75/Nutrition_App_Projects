package com.example.backend.userprofile.service;

import com.example.backend.enums.ActivityLevelEnum;
import com.example.backend.enums.BmiStatusEnum;
import com.example.backend.enums.WeightGoal;
import com.example.backend.service.impl.HealthMetricsServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

class HealthMetricsServiceImplTest {

    private com.example.backend.service.HealthMetricsService healthMetricsService;

    @BeforeEach
    void setUp() {
        healthMetricsService = new HealthMetricsServiceImpl();
    }

    @Test
    void calculateBmi_ShouldMatchFormula() {
        BigDecimal bmi = healthMetricsService.calculateBmi(BigDecimal.valueOf(70), BigDecimal.valueOf(175));
        assertEquals(new BigDecimal("22.86"), bmi);
    }

    @Test
    void classifyBmi_ShouldMatchThresholds() {
        assertEquals(BmiStatusEnum.UNDERWEIGHT, healthMetricsService.classifyBmi(new BigDecimal("18.49")));
        assertEquals(BmiStatusEnum.NORMAL, healthMetricsService.classifyBmi(new BigDecimal("18.50")));
        assertEquals(BmiStatusEnum.OVERWEIGHT, healthMetricsService.classifyBmi(new BigDecimal("25.00")));
        assertEquals(BmiStatusEnum.OBESITY_LEVEL_1, healthMetricsService.classifyBmi(new BigDecimal("30.00")));
        assertEquals(BmiStatusEnum.OBESITY_LEVEL_1, healthMetricsService.classifyBmi(new BigDecimal("40.00")));
    }

    @Test
    void calculateGoalCalories_ShouldAdjustByGoalAndKgPerWeek() {
        BigDecimal maintain = healthMetricsService.calculateGoalCalories(
                BigDecimal.valueOf(70), BigDecimal.valueOf(175), 30, "MALE", ActivityLevelEnum.ACTIVE, WeightGoal.MAINTAIN, BigDecimal.ZERO);
        BigDecimal lose = healthMetricsService.calculateGoalCalories(
                BigDecimal.valueOf(70), BigDecimal.valueOf(175), 30, "MALE", ActivityLevelEnum.ACTIVE, WeightGoal.LOSE, BigDecimal.valueOf(0.5));
        BigDecimal gain = healthMetricsService.calculateGoalCalories(
                BigDecimal.valueOf(70), BigDecimal.valueOf(175), 30, "MALE", ActivityLevelEnum.ACTIVE, WeightGoal.GAIN, BigDecimal.valueOf(0.5));

        assertEquals(new BigDecimal("2844.09"), maintain);
        assertEquals(new BigDecimal("2344.09"), lose);
        assertEquals(new BigDecimal("3344.09"), gain);
    }

    @Test
    void calculateGoalCalories_ShouldUseBusinessActivityFactorForLightActive() {
        BigDecimal maintain = healthMetricsService.calculateGoalCalories(
                BigDecimal.valueOf(70), BigDecimal.valueOf(175), 30, "MALE", ActivityLevelEnum.LIGHT_ACTIVE, WeightGoal.MAINTAIN, BigDecimal.ZERO);

        assertEquals(new BigDecimal("2555.56"), maintain);
    }

    @Test
    void calculateGoalCalories_ShouldThrowForInvalidInputs() {
        assertThrows(IllegalArgumentException.class,
                () -> healthMetricsService.calculateGoalCalories(BigDecimal.ZERO, BigDecimal.valueOf(170), 25, "MALE",
                        ActivityLevelEnum.SEDENTARY, WeightGoal.MAINTAIN, BigDecimal.ZERO));
        assertThrows(IllegalArgumentException.class,
                () -> healthMetricsService.calculateGoalCalories(BigDecimal.valueOf(60), BigDecimal.valueOf(170), 0, "MALE",
                        ActivityLevelEnum.SEDENTARY, WeightGoal.MAINTAIN, BigDecimal.ZERO));
        assertThrows(IllegalArgumentException.class,
                () -> healthMetricsService.calculateGoalCalories(BigDecimal.valueOf(60), BigDecimal.valueOf(170), 25, "OTHER",
                        ActivityLevelEnum.SEDENTARY, WeightGoal.MAINTAIN, BigDecimal.ZERO));
    }

    @Test
    void classifyBmi_ShouldThrow_WhenInputIsNull() {
        assertThrows(IllegalArgumentException.class, () -> healthMetricsService.classifyBmi(null));
    }
}
