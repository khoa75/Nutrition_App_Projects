package com.example.backend.dto;


import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class LogsDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;

    private Long userId;

    private LocalDateTime loggedAt;

    private BigDecimal gram;

    private BigDecimal totalCalories;

}
