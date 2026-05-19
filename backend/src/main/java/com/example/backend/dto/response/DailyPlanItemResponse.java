package com.example.backend.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyPlanItemResponse {
    private LocalDate planDate;
    private Integer baseTargetCalories;
    private Integer targetCalories;
    private BigDecimal consumedCalories;
    private BigDecimal remainingCalories;
}
