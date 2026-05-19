package com.example.backend.dto.request;

import com.example.backend.enums.ActivityLevelEnum;
import com.example.backend.enums.WeightGoal;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class RegisterRequest {

    @NotBlank(message = "Name is required")
    @Pattern(regexp = "^[A-Za-z ]{2,100}$", message = "Name must contain only letters and spaces")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @Pattern(regexp = "^$|^\\+?[0-9]{9,15}$", message = "Invalid phone format")
    private String phone;

    @NotBlank(message = "Password is required")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            message = "Password must be at least 8 chars with upper, lower, number and special char"
    )
    private String password;

    @NotNull(message = "Date of birth is required")
    private LocalDate dob;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotNull(message = "Current weight is required")
    @DecimalMin(value = "0.1", message = "Current weight must be greater than 0")
    private BigDecimal currentWeight;

    @NotNull(message = "Target weight is required")
    @DecimalMin(value = "0.1", message = "Target weight must be greater than 0")
    private BigDecimal targetWeight;

    @NotNull(message = "Height is required")
    @DecimalMin(value = "0.1", message = "Height must be greater than 0")
    private BigDecimal height;

    @NotNull(message = "Activity level is required")
    private ActivityLevelEnum activityLevel;

    @NotNull(message = "Goal type is required")
    private WeightGoal goalType;

    @NotNull(message = "kgPerWeek is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "kgPerWeek must be >= 0")
    private BigDecimal kgPerWeek;

}
