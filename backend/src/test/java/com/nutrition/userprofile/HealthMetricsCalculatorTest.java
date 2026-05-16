package com.nutrition.userprofile;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class HealthMetricsCalculatorTest {
    private final HealthMetricsCalculator calc = new HealthMetricsCalculator();

    @Test
    void testCalculateBMI() {
        double bmi = calc.calculateBMI(70, 175);
        assertEquals(22.86, bmi, 0.01);
    }

    @Test
    void testCalculateBMRMale() {
        double bmr = calc.calculateBMR(70, 175, 30, "male");
        assertEquals(1665, bmr, 1);
    }

    @Test
    void testCalculateBMRFemale() {
        double bmr = calc.calculateBMR(60, 165, 25, "female");
        assertEquals(1390, bmr, 1);
    }

    @Test
    void testCalculateTDEE() {
        double bmr = 1500;
        double tdeeSedentary = calc.calculateTDEE(bmr, "sedentary");
        assertEquals(1800, tdeeSedentary, 1);
        double tdeeActive = calc.calculateTDEE(bmr, "active");
        assertEquals(2587.5, tdeeActive, 1);
    }
}
