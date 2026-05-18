package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * $table.getTableComment()
 */
@Entity
@Getter
@Setter
@ToString
@SuperBuilder
@NoArgsConstructor
@Table(name = "foods")
public class Foods implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "protein", nullable = false)
    private BigDecimal protein;

    @Column(name = "carbs", nullable = false)
    private BigDecimal carbs;

    @Column(name = "fats", nullable = false)
    private BigDecimal fats;

    @Column(name = "fiber", nullable = false)
    private BigDecimal fiber;

    @Column(name = "calories_per_100g", nullable = false)
    private BigDecimal caloriesPer100g;

    @Column(name = "user_id")
    private Long userId;

}
