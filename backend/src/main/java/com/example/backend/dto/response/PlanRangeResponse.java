package com.example.backend.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlanRangeResponse {
    private List<DailyPlanItemResponse> plans;
}
