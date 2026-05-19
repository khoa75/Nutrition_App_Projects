package com.example.backend.service;

import com.example.backend.dto.request.CreateLogRequest;
import com.example.backend.dto.response.DailyCaloriesSummaryResponse;
import com.example.backend.dto.response.LogResponse;

import java.time.LocalDate;

public interface LogService {
    LogResponse createLog(String email, CreateLogRequest request);

    DailyCaloriesSummaryResponse getDailySummary(Long userId, LocalDate date);
}
