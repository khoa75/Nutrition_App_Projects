package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * $table.getTableComment()
 */
@Entity
@Getter
@Setter
@ToString
@SuperBuilder
@NoArgsConstructor
@Table(name = "users")
public class Users implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "hash_password", nullable = false)
    private String hashPassword;

    @Column(name = "current_weight")
    private BigDecimal currentWeight;

    @Column(name = "target_weight")
    private BigDecimal targetWeight;

    @Column(name = "height")
    private BigDecimal height;

    @Column(name = "gender")
    private String gender;

    @Column(name = "goal_calories")
    private Long goalCalories;

    @Column(name = "activity_level")
    private String activityLevel;

    @Column(name = "bmi")
    private BigDecimal bmi;

    @Column(name = "bmi_status")
    private String bmiStatus;

}
