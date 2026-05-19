package com.example.backend.entity;

import com.example.backend.enums.ActivityLevelEnum;
import com.example.backend.enums.BmiStatusEnum;
import com.example.backend.enums.UserStatus;
import com.example.backend.enums.WeightGoal;
import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Instant;
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

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "phone", unique = true)
    private String phone;

    @Column(name = "social_provider")
    private String socialProvider;

    @Column(name = "social_id", unique = true)
    private String socialId;

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
    private Integer goalCalories; //số calo ăn trong 1 tuần

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "activity_level", columnDefinition = "activity_level_enum")
    private ActivityLevelEnum activityLevel;

    @Column(name = "bmi")
    private BigDecimal bmi;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "bmi_status", columnDefinition = "bmi_status_enum")
    private BmiStatusEnum bmiStatus;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "user_status_enum")
    private UserStatus status = UserStatus.ACTIVE;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "goal_type", columnDefinition = "weight_goal_enum")
    private WeightGoal goalType;

    @Column(name = "kg_per_week")
    private BigDecimal kgPerWeek; //mục tiêu kg cần tăng/giảm trong tuần, nếu 0.0 là giữ

    @Column(name = "failed_login_attempts", nullable = false)
    private Integer failedLoginAttempts = 0;

    @Column(name = "lock_until")
    private Instant lockUntil;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "refresh_token_expiry")
    private Instant refreshTokenExpiry;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Foods> foods = new ArrayList<>();

}
