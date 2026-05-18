package com.nutrition.userprofile.service;

import com.nutrition.userprofile.model.ActivityLevel;
import com.nutrition.userprofile.model.BmiCategory;
import com.nutrition.userprofile.model.Gender;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

class UserProfileMetricCalculatorTest {

    private UserProfileMetricCalculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new UserProfileMetricCalculator();
    }

    @Test
    void calculateBmi_ShouldMatchStandardFormula() {
        BigDecimal bmi = calculator.calculateBmi(BigDecimal.valueOf(70), BigDecimal.valueOf(175));

        assertEquals(new BigDecimal("22.86"), bmi);
    }

    @Test
    void classifyBmi_ShouldRespectThresholds() {
        assertEquals(BmiCategory.NORMAL, calculator.classifyBmi(new BigDecimal("18.50")));
        assertEquals(BmiCategory.NORMAL, calculator.classifyBmi(new BigDecimal("24.90")));
        assertEquals(BmiCategory.OVERWEIGHT, calculator.classifyBmi(new BigDecimal("25.00")));
        assertEquals(BmiCategory.OBESE, calculator.classifyBmi(new BigDecimal("30.00")));
    }

    @Test
    void calculateBmr_ShouldMatchMifflinStJeorForMaleAndFemale() {
        BigDecimal maleBmr = calculator.calculateBmr(BigDecimal.valueOf(70), BigDecimal.valueOf(175), 30, Gender.MALE);
        BigDecimal femaleBmr = calculator.calculateBmr(BigDecimal.valueOf(70), BigDecimal.valueOf(175), 30, Gender.FEMALE);

        assertEquals(new BigDecimal("1648.75"), maleBmr);
        assertEquals(new BigDecimal("1482.75"), femaleBmr);
    }

    @Test
    void calculateTdee_ShouldApplyCorrectActivityFactor() {
        BigDecimal bmr = new BigDecimal("1648.75");

        assertEquals(new BigDecimal("1978.50"), calculator.calculateTdee(bmr, ActivityLevel.SEDENTARY));
        assertEquals(new BigDecimal("2555.56"), calculator.calculateTdee(bmr, ActivityLevel.LIGHT_ACTIVE));
        assertEquals(new BigDecimal("2844.09"), calculator.calculateTdee(bmr, ActivityLevel.ACTIVE));
    }

    @Test
    void calculateMethods_ShouldThrow_WhenInputInvalid() {
        assertThrows(IllegalArgumentException.class,
                () -> calculator.calculateBmi(BigDecimal.ZERO, BigDecimal.valueOf(175)));
        assertThrows(IllegalArgumentException.class,
                () -> calculator.calculateBmr(BigDecimal.valueOf(70), BigDecimal.valueOf(175), 0, Gender.MALE));
        assertThrows(IllegalArgumentException.class,
                () -> calculator.calculateTdee(BigDecimal.valueOf(1500), null));
    }
}
