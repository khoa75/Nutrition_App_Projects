package com.example.backend.dto.response;

import com.example.backend.enums.WeightGoal;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyCaloriePlanResponse {
    private Integer targetCalories;
    private Integer calorieDelta;
    private WeightGoal goalType;
}
