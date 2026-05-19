package com.example.backend.service.impl;

import com.example.backend.entity.DailyCaloriePlan;
import com.example.backend.entity.Users;
import com.example.backend.repository.DailyCaloriePlanRepository;
import com.example.backend.repository.LogsRepository;
import com.example.backend.service.DailyCaloriePlanService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class DailyCaloriePlanServiceImpl implements DailyCaloriePlanService {

    private static final Logger logger = LoggerFactory.getLogger(DailyCaloriePlanServiceImpl.class);
    private static final int DEFAULT_PLAN_DAYS = 30;
    private static final int MIN_TARGET_CALORIES = 1200;
    private static final int MAX_TARGET_CALORIES = 5000;

    private final DailyCaloriePlanRepository dailyCaloriePlanRepository;
    private final LogsRepository logsRepository;

    public DailyCaloriePlanServiceImpl(DailyCaloriePlanRepository dailyCaloriePlanRepository,
                                       LogsRepository logsRepository) {
        this.dailyCaloriePlanRepository = dailyCaloriePlanRepository;
        this.logsRepository = logsRepository;
    }

    @Override
    @Transactional
    public void generatePlanForUser(Users user, LocalDate startDate, int totalDays) {
        int days = totalDays > 0 ? totalDays : DEFAULT_PLAN_DAYS;
        int baseTarget = user.getGoalCalories() != null ? user.getGoalCalories() : MIN_TARGET_CALORIES;

        List<DailyCaloriePlan> plansToUpsert = new ArrayList<>(days);
        for (int i = 0; i < days; i++) {
            LocalDate planDate = startDate.plusDays(i);
            DailyCaloriePlan plan = dailyCaloriePlanRepository.findByUserIdAndPlanDate(user.getId(), planDate)
                    .orElseGet(() -> DailyCaloriePlan.builder()
                            .user(user)
                            .planDate(planDate)
                            .consumedCalories(BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP))
                            .build());

            plan.setBaseTargetCalories(baseTarget);
            plan.setTargetCalories(baseTarget);
            plan.setRemainingCalories(BigDecimal.valueOf(baseTarget).subtract(plan.getConsumedCalories()).setScale(2, RoundingMode.HALF_UP));
            plansToUpsert.add(plan);
        }
        dailyCaloriePlanRepository.saveAll(plansToUpsert);

        logger.info("Upserted {} daily calorie plans for userId={} from {}", days, user.getId(), startDate);
    }

    @Override
    @Transactional
    public void syncAndAdjust(Long userId, LocalDate date) {
        DailyCaloriePlan todayPlan = dailyCaloriePlanRepository.findByUserIdAndPlanDate(userId, date)
                .orElse(null);
        if (todayPlan == null) {
            return;
        }

        BigDecimal consumed = sumConsumedByDate(userId, date);
        todayPlan.setConsumedCalories(consumed);

        BigDecimal todayTarget = BigDecimal.valueOf(todayPlan.getTargetCalories());
        BigDecimal remaining = todayTarget.subtract(consumed).setScale(2, RoundingMode.HALF_UP);
        todayPlan.setRemainingCalories(remaining);
        dailyCaloriePlanRepository.save(todayPlan);

        LocalDate nextDate = date.plusDays(1);
        dailyCaloriePlanRepository.findByUserIdAndPlanDate(userId, nextDate).ifPresent(nextPlan -> {
            int nextBase = nextPlan.getBaseTargetCalories() != null
                    ? nextPlan.getBaseTargetCalories()
                    : nextPlan.getTargetCalories();

            int adjusted = nextBase;
            if (remaining.signum() < 0) {
                adjusted = clampCalories(nextBase - remaining.abs().setScale(0, RoundingMode.HALF_UP).intValue());
            } else if (remaining.signum() > 0) {
                adjusted = clampCalories(nextBase + remaining.setScale(0, RoundingMode.HALF_UP).intValue());
            }

            nextPlan.setTargetCalories(adjusted);
            nextPlan.setRemainingCalories(BigDecimal.valueOf(adjusted).subtract(nextPlan.getConsumedCalories()).setScale(2, RoundingMode.HALF_UP));
            dailyCaloriePlanRepository.save(nextPlan);

            logger.info("Adjusted next day plan for userId={} date={} targetCalories={}", userId, nextDate, adjusted);
        });
    }

    private BigDecimal sumConsumedByDate(Long userId, LocalDate date) {
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1).atStartOfDay();
        BigDecimal consumed = logsRepository.sumTotalCaloriesByUserIdAndLoggedAtBetween(userId, start, end);
        return consumed == null ? BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP) : consumed.setScale(2, RoundingMode.HALF_UP);
    }

    private int clampCalories(int value) {
        return Math.max(MIN_TARGET_CALORIES, Math.min(MAX_TARGET_CALORIES, value));
    }
}
