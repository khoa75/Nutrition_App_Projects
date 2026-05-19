package com.example.backend.controller;

import com.example.backend.dto.request.CreateLogRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.DailyCaloriesSummaryResponse;
import com.example.backend.dto.response.LogResponse;
import com.example.backend.enums.ErrorCode;
import com.example.backend.exception.AppException;
import com.example.backend.service.LogService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.security.Principal;

@Validated
@RestController
@RequestMapping("/api/v1/logs")
public class LogsController {

    private final LogService logService;

    public LogsController(LogService logService) {
        this.logService = logService;
    }

    @PostMapping
    public ApiResponse<LogResponse> createLog(Principal principal, @Valid @RequestBody CreateLogRequest request) {
        LogResponse response = logService.createLog(requireEmail(principal), request);
        return ApiResponse.<LogResponse>builder()
                .message("Create log success")
                .data(response)
                .build();
    }

    @GetMapping("/daily-summary")
    public ApiResponse<DailyCaloriesSummaryResponse> getDailySummary(
            @RequestParam @Min(value = 1, message = "userId must be greater than 0") Long userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        DailyCaloriesSummaryResponse response = logService.getDailySummary(userId, date);
        return ApiResponse.<DailyCaloriesSummaryResponse>builder()
                .message("Get daily summary success")
                .data(response)
                .build();
    }

    private String requireEmail(Principal principal) {
        if (principal == null || principal.getName() == null || principal.getName().isBlank()) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        return principal.getName();
    }
}
