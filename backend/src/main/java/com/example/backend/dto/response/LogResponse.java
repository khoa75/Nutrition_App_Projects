package com.example.backend.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LogResponse {
    private Long id;
    private Long userId;
    private Long foodId;
    private String foodName;
    private BigDecimal gram;
    private BigDecimal totalCalories;
    private Integer goalCalories;
    private BigDecimal remainingCalories;
    private LocalDateTime loggedAt;
}
