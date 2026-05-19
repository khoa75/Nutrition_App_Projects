package com.example.backend.controller;

import com.example.backend.dto.request.CreateLogRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.LogResponse;
import com.example.backend.service.LogService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class LogsControllerUnitTest {

    @Test
    void createLog_ShouldWrapInApiResponse() {
        LogService logService = Mockito.mock(LogService.class);
        LogsController controller = new LogsController(logService);
        Principal principal = () -> "john@example.com";

        LogResponse payload = LogResponse.builder()
                .id(1L)
                .userId(1L)
                .foodId(2L)
                .foodName("White Rice")
                .gram(BigDecimal.valueOf(200))
                .totalCalories(BigDecimal.valueOf(260.00))
                .goalCalories(2200)
                .remainingCalories(BigDecimal.valueOf(1940.00))
                .loggedAt(LocalDateTime.now())
                .build();
        when(logService.createLog(Mockito.eq("john@example.com"), any(CreateLogRequest.class))).thenReturn(payload);

        CreateLogRequest request = CreateLogRequest.builder()
                .foodId(2L)
                .gram(BigDecimal.valueOf(200))
                .build();

        ApiResponse<LogResponse> response = controller.createLog(principal, request);

        assertTrue(response.isSuccess());
        assertEquals("Create log success", response.getMessage());
        assertEquals(BigDecimal.valueOf(260.00), response.getData().getTotalCalories());
        assertEquals(BigDecimal.valueOf(1940.00), response.getData().getRemainingCalories());
    }
}
