package com.nutrition.userprofile.dto;

import com.nutrition.userprofile.model.ActivityLevel;
import com.nutrition.userprofile.model.Gender;
import com.nutrition.userprofile.model.GoalType;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class UserProfileRequestValidationTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        validator = Validation.buildDefaultValidatorFactory().getValidator();
    }

    @Test
    void shouldPassValidation_WhenRequestIsValid() {
        UserProfileRequest request = new UserProfileRequest();
        request.setName("Jane Doe");
        request.setDob(LocalDate.of(1998, 10, 5));
        request.setGender(Gender.FEMALE);
        request.setCurrentWeight(BigDecimal.valueOf(58));
        request.setTargetWeight(BigDecimal.valueOf(54));
        request.setHeight(BigDecimal.valueOf(165));
        request.setActivityLevel(ActivityLevel.LIGHT_ACTIVE);
        request.setGoalType(GoalType.LOSE);
        request.setKgPerWeek(BigDecimal.valueOf(0.5));

        Set<ConstraintViolation<UserProfileRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
    }

    @Test
    void shouldFailValidation_WhenRequiredFieldsMissingOrOutOfRange() {
        UserProfileRequest request = new UserProfileRequest();
        request.setName(" ");
        request.setHeight(BigDecimal.valueOf(10));
        request.setKgPerWeek(BigDecimal.valueOf(3));

        Set<ConstraintViolation<UserProfileRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
    }
}
