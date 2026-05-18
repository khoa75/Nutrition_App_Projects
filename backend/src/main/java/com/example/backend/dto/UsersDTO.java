package com.example.backend.dto;


import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class UsersDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;

    private String name;

    private LocalDate dob;

    private String username;

    private String hashPassword;

    private BigDecimal currentWeight;

    private BigDecimal targetWeight;

    private BigDecimal height;

    private String gender;

    private Long goalCalories;

    private String activityLevel;

    private BigDecimal bmi;

    private String bmiStatus;

}
