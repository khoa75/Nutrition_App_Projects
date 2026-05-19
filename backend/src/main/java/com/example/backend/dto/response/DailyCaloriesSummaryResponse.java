package com.example.backend.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyCaloriesSummaryResponse {
    private Long userId;
    private LocalDate date;
    private Integer targetCalories;
    private BigDecimal consumedCalories;
    private BigDecimal remainingCalories;
}
