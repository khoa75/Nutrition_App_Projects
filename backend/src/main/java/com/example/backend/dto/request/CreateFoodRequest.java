package com.example.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateFoodRequest {

    @NotBlank
    private String name;

    @NotNull
    @Positive
    private BigDecimal protein;

    @NotNull
    @Positive
    private BigDecimal carbs;

    @NotNull
    @Positive
    private BigDecimal fats;

    @NotNull
    @Positive
    private BigDecimal caloriesPer100g;

    private Long userId;
}
