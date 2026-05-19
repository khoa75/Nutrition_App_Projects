package com.example.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class MonthlyStatisticsResponse {
    private String message;
    private MonthlyData data;

    @Data
    @AllArgsConstructor
    public static class MonthlyData {
        private List<String> labels;
        private List<Integer> calories;
        private List<Integer> goals;
    }
}
