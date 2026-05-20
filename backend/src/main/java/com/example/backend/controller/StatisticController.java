package com.example.backend.controller;

import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.DailyCaloriePlanResponse;
import com.example.backend.dto.response.MonthlyStatisticsResponse;
import com.example.backend.dto.response.WeeklyStatisticsResponse;
import com.example.backend.service.impl.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/statistic")
public class StatisticController {
    @Autowired
    private StatisticsService statisticsService;

    @GetMapping("/weekly")
    public ApiResponse<WeeklyStatisticsResponse> getWeeklyStatistics(
            @RequestParam("userId") Long userId,
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start) {

        WeeklyStatisticsResponse response = statisticsService.getWeeklyStatistics(userId, start);

        return ApiResponse.<WeeklyStatisticsResponse>builder()
                .message("Weekly statistic")
                .data(response)
                .build();
    }

    @GetMapping("/monthly")
    public  ApiResponse<MonthlyStatisticsResponse> getMonthlyStatistics(
            @RequestParam("userId") Long userId,
            @RequestParam("year") int year,
            @RequestParam("month") int month) {

        MonthlyStatisticsResponse response = statisticsService.getMonthlyStatistics(userId, year, month);
        return ApiResponse.<MonthlyStatisticsResponse>builder()
                .message("Monthly statistic")
                .data(response)
                .build();
    }
}
