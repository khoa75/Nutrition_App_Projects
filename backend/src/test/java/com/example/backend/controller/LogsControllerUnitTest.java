package com.example.backend.controller;

import com.example.backend.dto.request.CreateLogByNameRequest;
import com.example.backend.dto.request.CreateLogRequest;
import com.example.backend.dto.request.PreviewLogByNameRequest;
import com.example.backend.dto.request.UpdateLogGramRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.LogNutritionPreviewResponse;
import com.example.backend.dto.response.LogResponse;
import com.example.backend.service.LogService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
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

    @Test
    void createLogByName_ShouldWrapInApiResponse() {
        LogService logService = Mockito.mock(LogService.class);
        LogsController controller = new LogsController(logService);
        Principal principal = () -> "john@example.com";

        LogResponse payload = LogResponse.builder()
                .id(2L)
                .userId(1L)
                .foodId(2L)
                .foodName("White Rice")
                .gram(BigDecimal.valueOf(50))
                .totalCalories(BigDecimal.valueOf(65.00))
                .build();

        when(logService.createLogByName(Mockito.eq("john@example.com"), any(CreateLogByNameRequest.class))).thenReturn(payload);

        CreateLogByNameRequest request = CreateLogByNameRequest.builder()
                .foodName("rice")
                .gram(BigDecimal.valueOf(50))
                .build();

        ApiResponse<LogResponse> response = controller.createLogByName(principal, request);

        assertTrue(response.isSuccess());
        assertEquals("Create log success", response.getMessage());
        assertEquals(BigDecimal.valueOf(65.00), response.getData().getTotalCalories());
    }

    @Test
    void previewLogByName_ShouldWrapInApiResponse() {
        LogService logService = Mockito.mock(LogService.class);
        LogsController controller = new LogsController(logService);

        LogNutritionPreviewResponse payload = LogNutritionPreviewResponse.builder()
                .foodId(2L)
                .foodName("White Rice")
                .gram(BigDecimal.valueOf(50))
                .calories(BigDecimal.valueOf(65.00))
                .protein(BigDecimal.valueOf(1.35))
                .carbs(BigDecimal.valueOf(14.00))
                .fats(BigDecimal.valueOf(0.15))
                .build();

        when(logService.previewLogByName(any(PreviewLogByNameRequest.class))).thenReturn(payload);

        PreviewLogByNameRequest request = PreviewLogByNameRequest.builder()
                .foodName("rice")
                .gram(BigDecimal.valueOf(50))
                .build();

        ApiResponse<LogNutritionPreviewResponse> response = controller.previewLogByName(request);

        assertTrue(response.isSuccess());
        assertEquals("Preview log success", response.getMessage());
        assertEquals(BigDecimal.valueOf(65.00), response.getData().getCalories());
    }

    @Test
    void deleteLog_ShouldWrapInApiResponse() {
        LogService logService = Mockito.mock(LogService.class);
        LogsController controller = new LogsController(logService);
        Principal principal = () -> "john@example.com";

        ApiResponse<Void> response = controller.deleteLog(principal, 99L);

        verify(logService).deleteLog("john@example.com", 99L);
        assertTrue(response.isSuccess());
        assertEquals("Delete log success", response.getMessage());
    }

    @Test
    void getLogsByDate_ShouldWrapInApiResponse() {
        LogService logService = Mockito.mock(LogService.class);
        LogsController controller = new LogsController(logService);
        Principal principal = () -> "john@example.com";

        LogResponse item = LogResponse.builder()
                .id(1L)
                .foodName("White Rice")
                .gram(BigDecimal.valueOf(100))
                .totalCalories(BigDecimal.valueOf(130))
                .loggedAt(LocalDateTime.of(2026, 5, 20, 8, 0))
                .build();
        when(logService.getLogsByDate("john@example.com", LocalDate.of(2026, 5, 20))).thenReturn(List.of(item));

        ApiResponse<List<LogResponse>> response = controller.getLogsByDate(principal, LocalDate.of(2026, 5, 20));

        assertTrue(response.isSuccess());
        assertEquals("Get daily logs success", response.getMessage());
        assertEquals(1, response.getData().size());
    }

    @Test
    void getLogsByRange_ShouldWrapInApiResponse() {
        LogService logService = Mockito.mock(LogService.class);
        LogsController controller = new LogsController(logService);
        Principal principal = () -> "john@example.com";

        when(logService.getLogsByDateRange("john@example.com", LocalDate.of(2026, 5, 1), LocalDate.of(2026, 5, 7)))
                .thenReturn(List.of());

        ApiResponse<List<LogResponse>> response = controller.getLogsByRange(principal, LocalDate.of(2026, 5, 1), LocalDate.of(2026, 5, 7));

        assertTrue(response.isSuccess());
        assertEquals("Get range logs success", response.getMessage());
        assertEquals(0, response.getData().size());
    }

    @Test
    void updateLogGram_ShouldWrapInApiResponse() {
        LogService logService = Mockito.mock(LogService.class);
        LogsController controller = new LogsController(logService);
        Principal principal = () -> "john@example.com";

        LogResponse payload = LogResponse.builder()
                .id(1L)
                .userId(1L)
                .foodId(2L)
                .foodName("White Rice")
                .gram(BigDecimal.valueOf(150))
                .totalCalories(BigDecimal.valueOf(195.00))
                .goalCalories(2200)
                .remainingCalories(BigDecimal.valueOf(2005.00))
                .loggedAt(LocalDateTime.now())
                .build();
        when(logService.updateLogGram(Mockito.eq("john@example.com"), Mockito.eq(1L), any(UpdateLogGramRequest.class)))
                .thenReturn(payload);

        UpdateLogGramRequest request = UpdateLogGramRequest.builder()
                .gram(BigDecimal.valueOf(150))
                .build();

        ApiResponse<LogResponse> response = controller.updateLogGram(principal, 1L, request);

        assertTrue(response.isSuccess());
        assertEquals("Update log success", response.getMessage());
        assertEquals(BigDecimal.valueOf(150), response.getData().getGram());
    }
}
