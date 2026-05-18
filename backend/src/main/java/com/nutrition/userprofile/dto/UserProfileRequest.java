package com.nutrition.userprofile.dto;

import com.nutrition.userprofile.model.ActivityLevel;
import com.nutrition.userprofile.model.Gender;
import com.nutrition.userprofile.model.GoalType;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileRequest {

    @NotBlank(message = "name is required")
    private String name;

    @NotNull(message = "dob is required")
    private LocalDate dob;

    @NotNull(message = "gender is required")
    private Gender gender;

    @NotNull(message = "currentWeight is required")
    @DecimalMin(value = "1.0", message = "currentWeight must be greater than 0")
    private BigDecimal currentWeight;

    @NotNull(message = "targetWeight is required")
    @DecimalMin(value = "1.0", message = "targetWeight must be greater than 0")
    private BigDecimal targetWeight;

    @NotNull(message = "height is required")
    @DecimalMin(value = "30.0", message = "height must be at least 30 cm")
    @DecimalMax(value = "300.0", message = "height must be at most 300 cm")
    private BigDecimal height;

    @NotNull(message = "activityLevel is required")
    private ActivityLevel activityLevel;

    @NotNull(message = "goalType is required")
    private GoalType goalType;

    @NotNull(message = "kgPerWeek is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "kgPerWeek must be >= 0")
    @DecimalMax(value = "2.0", inclusive = true, message = "kgPerWeek must be <= 2")
    private BigDecimal kgPerWeek;
}
