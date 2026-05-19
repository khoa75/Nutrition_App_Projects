package com.example.backend.controller;

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
    public ResponseEntity<WeeklyStatisticsResponse> getWeeklyStatistics(
            @RequestParam("userId") Long userId,
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start) {

        WeeklyStatisticsResponse response = statisticsService.getWeeklyStatistics(userId, start);
        return ResponseEntity.ok(response);
    }


}
