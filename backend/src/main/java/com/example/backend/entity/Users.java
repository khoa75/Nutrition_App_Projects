package com.example.backend.entity;

import com.example.backend.enums.ActivityLevelEnum;
import com.example.backend.enums.BmiStatusEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    @Enumerated(EnumType.STRING)
    @Column(name = "activity_level")
    private ActivityLevelEnum activityLevel;

    @Column(name = "bmi")
    private BigDecimal bmi;

    @Enumerated(EnumType.STRING)
    @Column(name = "bmi_status")
    private BmiStatusEnum bmiStatus;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Foods> foods = new ArrayList<>();

}
