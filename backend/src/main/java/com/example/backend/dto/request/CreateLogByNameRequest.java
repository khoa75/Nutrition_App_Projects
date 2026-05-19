package com.example.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateLogByNameRequest {

    @NotBlank(message = "foodName must not be blank")
    private String foodName;

    @NotNull
    @Positive
    private BigDecimal gram;

    private LocalDateTime loggedAt;

    private LocalDate logDate;
}
