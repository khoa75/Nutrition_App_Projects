package com.example.backend.dto.response.userprofile;

import com.example.backend.enums.ActivityLevelEnum;
import com.example.backend.enums.BmiStatusEnum;
import com.example.backend.enums.WeightGoal;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {
    private String name;
    private String email;
    private LocalDate dob;
    private String gender;
    private BigDecimal currentWeight;
    private BigDecimal targetWeight;
    private BigDecimal height;
    private ActivityLevelEnum activityLevel;
    private WeightGoal goalType;
    private BigDecimal kgPerWeek;
    private BigDecimal bmi;
    private BmiStatusEnum bmiStatus;
    private Integer goalCalories;
}
