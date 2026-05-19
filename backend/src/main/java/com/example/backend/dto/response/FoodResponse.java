package com.example.backend.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FoodResponse {
    private Long id;
    private String name;
    private BigDecimal protein;
    private BigDecimal carbs;
    private BigDecimal fats;
    private BigDecimal caloriesPer100g;
    private Long userId;
}
