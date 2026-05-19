package com.example.backend.controller;

import com.example.backend.dto.request.CreateLogByNameRequest;
import com.example.backend.dto.request.CreateLogRequest;
import com.example.backend.dto.request.PreviewLogByNameRequest;
import com.example.backend.dto.request.UpdateLogGramRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.DailyCaloriesSummaryResponse;
import com.example.backend.dto.response.LogNutritionPreviewResponse;
import com.example.backend.dto.response.LogResponse;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.enums.ErrorCode;
import com.example.backend.exception.AppException;
import com.example.backend.service.LogService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.security.Principal;
import java.util.List;

@Validated
@RestController
@RequestMapping("/api/logs")
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

    @PostMapping("/by-name")
    public ApiResponse<LogResponse> createLogByName(Principal principal, @Valid @RequestBody CreateLogByNameRequest request) {
        LogResponse response = logService.createLogByName(requireEmail(principal), request);
        return ApiResponse.<LogResponse>builder()
                .message("Create log success")
                .data(response)
                .build();
    }

    @PostMapping("/preview-by-name")
    public ApiResponse<LogNutritionPreviewResponse> previewLogByName(@Valid @RequestBody PreviewLogByNameRequest request) {
        LogNutritionPreviewResponse response = logService.previewLogByName(request);
        return ApiResponse.<LogNutritionPreviewResponse>builder()
                .message("Preview log success")
                .data(response)
                .build();
    }

    @PutMapping("/{logId}")
    public ApiResponse<LogResponse> updateLogGram(Principal principal,
                                                   @PathVariable Long logId,
                                                   @Valid @RequestBody UpdateLogGramRequest request) {
        LogResponse response = logService.updateLogGram(requireEmail(principal), logId, request);
        return ApiResponse.<LogResponse>builder()
                .message("Update log success")
                .data(response)
                .build();
    }

    @DeleteMapping("/{logId}")
    public ApiResponse<Void> deleteLog(Principal principal, @PathVariable Long logId) {
        logService.deleteLog(requireEmail(principal), logId);
        return ApiResponse.<Void>builder()
                .message("Delete log success")
                .build();
    }

    @GetMapping
    public ApiResponse<PageResponse<LogResponse>> getLogs(
            @RequestParam Long userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageResponse<LogResponse> response = logService.getLogs(userId, from, to, page, size);
        return ApiResponse.<PageResponse<LogResponse>>builder()
                .message("Get logs success")
                .data(response)
                .build();
    }

    @GetMapping("/daily")
    public ApiResponse<List<LogResponse>> getLogsByDate(
            Principal principal,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        LocalDate targetDate = date != null ? date : LocalDate.now();
        List<LogResponse> response = logService.getLogsByDate(requireEmail(principal), targetDate);

        return ApiResponse.<List<LogResponse>>builder()
                .message("Get daily logs success")
                .data(response)
                .build();
    }

    @GetMapping("/range")
    public ApiResponse<List<LogResponse>> getLogsByRange(
            Principal principal,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate) {
        List<LogResponse> response = logService.getLogsByDateRange(requireEmail(principal), fromDate, toDate);

        return ApiResponse.<List<LogResponse>>builder()
                .message("Get range logs success")
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
