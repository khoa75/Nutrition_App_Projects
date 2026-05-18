package com.example.backend.dto;


import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
public class FoodsDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;

    private String name;

    private BigDecimal protein;

    private BigDecimal carbs;

    private BigDecimal fats;

    private BigDecimal fiber;

    private BigDecimal caloriesPer100g;

    private Long userId;

}
