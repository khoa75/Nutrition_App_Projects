package com.example.backend.service;

import com.example.backend.dto.request.CreateLogByNameRequest;
import com.example.backend.dto.request.CreateLogRequest;
import com.example.backend.dto.request.PreviewLogByNameRequest;
import com.example.backend.dto.request.UpdateLogGramRequest;
import com.example.backend.dto.response.DailyCaloriesSummaryResponse;
import com.example.backend.dto.response.LogNutritionPreviewResponse;
import com.example.backend.dto.response.LogResponse;
import com.example.backend.dto.response.PageResponse;

import java.time.LocalDate;
import java.util.List;

public interface LogService {
    LogResponse createLog(String email, CreateLogRequest request);

    LogResponse createLogByName(String email, CreateLogByNameRequest request);

    LogNutritionPreviewResponse previewLogByName(PreviewLogByNameRequest request);

    LogResponse updateLogGram(String email, Long logId, UpdateLogGramRequest request);

    void deleteLog(String email, Long logId);

    List<LogResponse> getLogsByDate(String email, LocalDate date);

    List<LogResponse> getLogsByDateRange(String email, LocalDate fromDate, LocalDate toDate);

    DailyCaloriesSummaryResponse getDailySummary(Long userId, LocalDate date);

    PageResponse<LogResponse> getLogs(Long userId, LocalDate from, LocalDate to, int page, int size);
}
