package com.example.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateLogRequest {

    @NotNull
    private Long foodId;

    @NotNull
    @Positive
    private BigDecimal gram;

    private LocalDateTime loggedAt;
}
