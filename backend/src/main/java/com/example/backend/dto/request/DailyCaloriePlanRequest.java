package com.example.backend.dto.request;

import com.example.backend.enums.WeightGoal;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyCaloriePlanRequest {

    @NotNull
    @Positive
    private BigDecimal tdee;

    @NotNull
    private WeightGoal goalType;
}
