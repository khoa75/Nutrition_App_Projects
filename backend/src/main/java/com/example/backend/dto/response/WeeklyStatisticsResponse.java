package com.example.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class WeeklyStatisticsResponse {
    private String message;
    private WeeklyData data;

    @Data
    @AllArgsConstructor
    public static class WeeklyData {
        private List<String> labels;
        private List<Integer> calories;
        private List<Integer> goals;
    }
}
