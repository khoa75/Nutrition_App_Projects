package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "daily_calorie_plans", indexes = {
        @Index(name = "idx_daily_plan_user_date", columnList = "user_id, plan_date", unique = true)
})
public class DailyCaloriePlan implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(name = "plan_date", nullable = false)
    private LocalDate planDate;

    @Column(name = "base_target_calories", nullable = false)
    private Integer baseTargetCalories;

    @Column(name = "target_calories", nullable = false)
    private Integer targetCalories;

    @Column(name = "consumed_calories", nullable = false, precision = 10, scale = 2)
    private BigDecimal consumedCalories;

    @Column(name = "remaining_calories", nullable = false, precision = 10, scale = 2)
    private BigDecimal remainingCalories;
}
