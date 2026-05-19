package com.example.backend.service.impl;

import com.example.backend.dto.request.CreateLogRequest;
import com.example.backend.dto.response.DailyCaloriesSummaryResponse;
import com.example.backend.dto.response.LogResponse;
import com.example.backend.entity.Foods;
import com.example.backend.entity.LogFoods;
import com.example.backend.entity.LogFoodsId;
import com.example.backend.entity.Logs;
import com.example.backend.entity.Users;
import com.example.backend.enums.ErrorCode;
import com.example.backend.exception.AppException;
import com.example.backend.repository.FoodsRepository;
import com.example.backend.repository.LogFoodsRepository;
import com.example.backend.repository.LogsRepository;
import com.example.backend.repository.UsersRepository;
import com.example.backend.service.LogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class LogServiceImpl implements LogService {

    private static final Logger logger = LoggerFactory.getLogger(LogServiceImpl.class);

    private final LogsRepository logsRepository;
    private final LogFoodsRepository logFoodsRepository;
    private final FoodsRepository foodsRepository;
    private final UsersRepository usersRepository;

    public LogServiceImpl(LogsRepository logsRepository,
                          LogFoodsRepository logFoodsRepository,
                          FoodsRepository foodsRepository,
                          UsersRepository usersRepository) {
        this.logsRepository = logsRepository;
        this.logFoodsRepository = logFoodsRepository;
        this.foodsRepository = foodsRepository;
        this.usersRepository = usersRepository;
    }

    @Override
    @Transactional
    public LogResponse createLog(String email, CreateLogRequest request) {
        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        Foods food = foodsRepository.findById(request.getFoodId())
                .orElseThrow(() -> new AppException(ErrorCode.FOOD_NOT_FOUND));

        BigDecimal totalCalories = request.getGram()
                .multiply(food.getCaloriesPer100g())
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);

        Logs log = Logs.builder()
                .user(user)
                .gram(request.getGram())
                .loggedAt(request.getLoggedAt() != null ? request.getLoggedAt() : LocalDateTime.now())
                .goalCalories(user.getGoalCalories())
                .totalCalories(totalCalories)
                .build();

        Logs saved = logsRepository.save(log);

        LogFoods logFoods = LogFoods.builder()
                .id(new LogFoodsId(saved.getId(), food.getId()))
                .logs(saved)
                .food(food)
                .build();
        logFoodsRepository.save(logFoods);

        LocalDate logDate = saved.getLoggedAt().toLocalDate();
        LocalDateTime start = logDate.atStartOfDay();
        LocalDateTime end = logDate.plusDays(1).atStartOfDay();
        BigDecimal consumed = logsRepository.sumTotalCaloriesByUserIdAndLoggedAtBetween(user.getId(), start, end);
        if (consumed == null) {
            consumed = BigDecimal.ZERO;
        }
        Integer targetCalories = user.getGoalCalories() != null ? user.getGoalCalories() : 0;
        BigDecimal remainingCalories = BigDecimal.valueOf(targetCalories).subtract(consumed);

        logger.info("Created log id={} userId={} foodId={} calories={}", saved.getId(), user.getId(), food.getId(), totalCalories);

        return LogResponse.builder()
                .id(saved.getId())
                .userId(user.getId())
                .foodId(food.getId())
                .foodName(food.getName())
                .gram(saved.getGram())
                .totalCalories(saved.getTotalCalories())
                .goalCalories(targetCalories)
                .remainingCalories(remainingCalories)
                .loggedAt(saved.getLoggedAt())
                .build();
    }

    @Override
    public DailyCaloriesSummaryResponse getDailySummary(Long userId, LocalDate date) {
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1).atStartOfDay();
        BigDecimal consumed = logsRepository.sumTotalCaloriesByUserIdAndLoggedAtBetween(userId, start, end);
        if (consumed == null) {
            consumed = BigDecimal.ZERO;
        }

        Integer target = user.getGoalCalories() != null ? user.getGoalCalories() : 0;
        BigDecimal remaining = BigDecimal.valueOf(target).subtract(consumed);

        return DailyCaloriesSummaryResponse.builder()
                .userId(userId)
                .date(date)
                .targetCalories(target)
                .consumedCalories(consumed)
                .remainingCalories(remaining)
                .build();
    }
}
