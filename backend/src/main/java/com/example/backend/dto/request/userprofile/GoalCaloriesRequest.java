package com.example.backend.dto.request.userprofile;

import com.example.backend.enums.ActivityLevelEnum;
import com.example.backend.enums.WeightGoal;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoalCaloriesRequest {

    private LocalDate dob;

    @NotNull
    @Positive
    private BigDecimal currentWeight;

    @NotNull
    @Positive
    private BigDecimal height;

    @NotNull
    @Positive
    private BigDecimal targetWeight;

    @NotBlank
    private String gender;

    @NotNull
    private ActivityLevelEnum activityLevel;

    @NotNull
    private WeightGoal goalType;

    @NotNull
    @DecimalMin(value = "0.0")
    private BigDecimal kgPerWeek;
}
