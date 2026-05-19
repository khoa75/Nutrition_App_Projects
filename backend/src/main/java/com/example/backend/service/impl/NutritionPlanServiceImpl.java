package com.example.backend.service.impl;

import com.example.backend.dto.request.DailyCaloriePlanRequest;
import com.example.backend.dto.response.DailyCaloriePlanResponse;
import com.example.backend.dto.response.DailyPlanItemResponse;
import com.example.backend.dto.response.PlanRangeResponse;
import com.example.backend.entity.DailyCaloriePlan;
import com.example.backend.entity.Users;
import com.example.backend.enums.ErrorCode;
import com.example.backend.enums.WeightGoal;
import com.example.backend.exception.AppException;
import com.example.backend.repository.DailyCaloriePlanRepository;
import com.example.backend.repository.UsersRepository;
import com.example.backend.service.NutritionPlanService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Service
public class NutritionPlanServiceImpl implements NutritionPlanService {

    private static final int DEFAULT_CALORIE_DELTA = 500;
    private static final int MIN_TARGET_CALORIES = 1200;

    private final UsersRepository usersRepository;
    private final DailyCaloriePlanRepository dailyCaloriePlanRepository;

    public NutritionPlanServiceImpl(UsersRepository usersRepository, DailyCaloriePlanRepository dailyCaloriePlanRepository) {
        this.usersRepository = usersRepository;
        this.dailyCaloriePlanRepository = dailyCaloriePlanRepository;
    }

    @Override
    public DailyCaloriePlanResponse calculateDailyTarget(DailyCaloriePlanRequest request) {
        int tdee = request.getTdee().setScale(0, java.math.RoundingMode.HALF_UP).intValue();
        int calorieDelta = switch (request.getGoalType()) {
            case MAINTAIN -> 0;
            case GAIN, LOSE -> DEFAULT_CALORIE_DELTA;
        };

        int targetCalories = calculateTargetCalories(tdee, request.getGoalType(), calorieDelta);

        return DailyCaloriePlanResponse.builder()
                .goalType(request.getGoalType())
                .calorieDelta(calorieDelta)
                .targetCalories(targetCalories)
                .build();
    }

    @Override
    public DailyPlanItemResponse getDailyPlan(String email, LocalDate date) {
        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        DailyCaloriePlan plan = dailyCaloriePlanRepository.findByUserIdAndPlanDate(user.getId(), date)
                .orElseThrow(() -> new AppException(ErrorCode.DAILY_PLAN_NOT_FOUND));

        return toDailyPlanItemResponse(plan);
    }

    @Override
    public PlanRangeResponse getWeeklyPlan(String email, LocalDate startDate) {
        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        LocalDate endDate = startDate.plusDays(6);
        List<DailyCaloriePlan> plans = dailyCaloriePlanRepository
                .findByUserIdAndPlanDateBetweenOrderByPlanDateAsc(user.getId(), startDate, endDate);

        return PlanRangeResponse.builder()
                .plans(plans.stream().map(this::toDailyPlanItemResponse).toList())
                .build();
    }

    @Override
    public PlanRangeResponse getMonthlyPlan(String email, YearMonth yearMonth) {
        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        LocalDate fromDate = yearMonth.atDay(1);
        LocalDate toDate = yearMonth.atEndOfMonth();
        List<DailyCaloriePlan> plans = dailyCaloriePlanRepository
                .findByUserIdAndPlanDateBetweenOrderByPlanDateAsc(user.getId(), fromDate, toDate);

        return PlanRangeResponse.builder()
                .plans(plans.stream().map(this::toDailyPlanItemResponse).toList())
                .build();
    }

    private DailyPlanItemResponse toDailyPlanItemResponse(DailyCaloriePlan plan) {
        return DailyPlanItemResponse.builder()
                .planDate(plan.getPlanDate())
                .baseTargetCalories(plan.getBaseTargetCalories())
                .targetCalories(plan.getTargetCalories())
                .consumedCalories(plan.getConsumedCalories())
                .remainingCalories(plan.getRemainingCalories())
                .build();
    }

    private int calculateTargetCalories(int tdee, WeightGoal goalType, int calorieDelta) {
        int result = switch (goalType) {
            case MAINTAIN -> tdee;
            case GAIN -> tdee + calorieDelta;
            case LOSE -> tdee - calorieDelta;
        };

        return Math.max(result, MIN_TARGET_CALORIES);
    }
}
