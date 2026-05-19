package com.example.backend.service.impl;

import com.example.backend.dto.request.CreateLogByNameRequest;
import com.example.backend.dto.request.CreateLogRequest;
import com.example.backend.dto.request.PreviewLogByNameRequest;
import com.example.backend.dto.request.UpdateLogGramRequest;
import com.example.backend.dto.response.DailyCaloriesSummaryResponse;
import com.example.backend.dto.response.LogNutritionPreviewResponse;
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
import com.example.backend.service.DailyCaloriePlanService;
import com.example.backend.service.LogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LogServiceImpl implements LogService {

    private static final Logger logger = LoggerFactory.getLogger(LogServiceImpl.class);

    private final LogsRepository logsRepository;
    private final LogFoodsRepository logFoodsRepository;
    private final FoodsRepository foodsRepository;
    private final UsersRepository usersRepository;
    private final DailyCaloriePlanService dailyCaloriePlanService;

    public LogServiceImpl(LogsRepository logsRepository,
                          LogFoodsRepository logFoodsRepository,
                          FoodsRepository foodsRepository,
                          UsersRepository usersRepository,
                          DailyCaloriePlanService dailyCaloriePlanService) {
        this.logsRepository = logsRepository;
        this.logFoodsRepository = logFoodsRepository;
        this.foodsRepository = foodsRepository;
        this.usersRepository = usersRepository;
        this.dailyCaloriePlanService = dailyCaloriePlanService;
    }

    @Override
    @Transactional
    public LogResponse createLog(String email, CreateLogRequest request) {
        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        Foods food = foodsRepository.findById(request.getFoodId())
                .orElseThrow(() -> new AppException(ErrorCode.FOOD_NOT_FOUND));

        BigDecimal totalCalories = calculateByGram(food.getCaloriesPer100g(), request.getGram());

        LocalDateTime loggedAt = resolveLoggedAt(request.getLoggedAt(), request.getLogDate());

        Logs log = Logs.builder()
                .user(user)
                .gram(request.getGram())
                .loggedAt(loggedAt)
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

        dailyCaloriePlanService.syncAndAdjust(user.getId(), saved.getLoggedAt().toLocalDate());

        return toLogResponse(saved, food, targetCalories, remainingCalories);
    }

    @Override
    @Transactional
    public LogResponse createLogByName(String email, CreateLogByNameRequest request) {
        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        Foods food = resolveFoodByName(request.getFoodName());
        BigDecimal totalCalories = calculateByGram(food.getCaloriesPer100g(), request.getGram());

        LocalDateTime loggedAt = resolveLoggedAt(request.getLoggedAt(), request.getLogDate());

        Logs log = Logs.builder()
                .user(user)
                .gram(request.getGram())
                .loggedAt(loggedAt)
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

        logger.info("Created log by name id={} userId={} foodId={} foodName={} calories={}",
                saved.getId(), user.getId(), food.getId(), food.getName(), totalCalories);

        dailyCaloriePlanService.syncAndAdjust(user.getId(), saved.getLoggedAt().toLocalDate());

        return toLogResponse(saved, food, targetCalories, remainingCalories);
    }

    @Override
    public LogNutritionPreviewResponse previewLogByName(PreviewLogByNameRequest request) {
        Foods food = resolveFoodByName(request.getFoodName());

        LocalDateTime previewLoggedAt = request.getLogDate() != null
                ? request.getLogDate().atStartOfDay()
                : LocalDateTime.now();

        return LogNutritionPreviewResponse.builder()
                .foodId(food.getId())
                .foodName(food.getName())
                .gram(request.getGram())
                .calories(calculateByGram(food.getCaloriesPer100g(), request.getGram()))
                .protein(calculateByGram(food.getProtein(), request.getGram()))
                .carbs(calculateByGram(food.getCarbs(), request.getGram()))
                .fats(calculateByGram(food.getFats(), request.getGram()))
                .loggedAt(previewLoggedAt)
                .build();
    }

    @Override
    @Transactional
    public LogResponse updateLogGram(String email, Long logId, UpdateLogGramRequest request) {
        Logs log = logsRepository.findByIdAndUserEmail(logId, email)
                .orElseThrow(() -> new AppException(ErrorCode.LOG_NOT_FOUND));

        LogFoods logFoods = logFoodsRepository.findFirstByLogs_Id(logId)
                .orElseThrow(() -> new AppException(ErrorCode.FOOD_NOT_FOUND));

        Foods food = logFoods.getFood();
        BigDecimal totalCalories = calculateByGram(food.getCaloriesPer100g(), request.getGram());

        log.setGram(request.getGram());
        log.setTotalCalories(totalCalories);

        Logs saved = logsRepository.save(log);

        LocalDate logDate = saved.getLoggedAt().toLocalDate();
        LocalDateTime start = logDate.atStartOfDay();
        LocalDateTime end = logDate.plusDays(1).atStartOfDay();
        BigDecimal consumed = logsRepository.sumTotalCaloriesByUserIdAndLoggedAtBetween(saved.getUser().getId(), start, end);
        if (consumed == null) {
            consumed = BigDecimal.ZERO;
        }
        Integer targetCalories = saved.getUser().getGoalCalories() != null ? saved.getUser().getGoalCalories() : 0;
        BigDecimal remainingCalories = BigDecimal.valueOf(targetCalories).subtract(consumed);

        logger.info("Updated log id={} userId={} gram={} calories={}", saved.getId(), saved.getUser().getId(), saved.getGram(), saved.getTotalCalories());

        dailyCaloriePlanService.syncAndAdjust(saved.getUser().getId(), saved.getLoggedAt().toLocalDate());

        return toLogResponse(saved, food, targetCalories, remainingCalories);
    }

    @Override
    @Transactional
    public void deleteLog(String email, Long logId) {
        Logs log = logsRepository.findByIdAndUserEmail(logId, email)
                .orElseThrow(() -> new AppException(ErrorCode.LOG_NOT_FOUND));

        LocalDate logDate = log.getLoggedAt().toLocalDate();

        logFoodsRepository.deleteByLogs_Id(logId);
        logsRepository.delete(log);

        dailyCaloriePlanService.syncAndAdjust(log.getUser().getId(), logDate);

        logger.info("Deleted log id={} userId={}", logId, log.getUser().getId());
    }

    @Override
    public List<LogResponse> getLogsByDate(String email, LocalDate date) {
        return getLogsByDateRange(email, date, date);
    }

    @Override
    public List<LogResponse> getLogsByDateRange(String email, LocalDate fromDate, LocalDate toDate) {
        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        if (toDate.isBefore(fromDate)) {
            throw new IllegalArgumentException("toDate must be greater than or equal to fromDate");
        }

        LocalDateTime start = fromDate.atStartOfDay();
        LocalDateTime end = toDate.plusDays(1).atStartOfDay();

        List<Logs> logs = logsRepository.findByUserIdAndLoggedAtBetweenOrderByLoggedAtDesc(user.getId(), start, end);

        return logs.stream()
                .map(log -> {
                    Foods food = logFoodsRepository.findFirstByLogs_Id(log.getId())
                            .map(LogFoods::getFood)
                            .orElseThrow(() -> new AppException(ErrorCode.FOOD_NOT_FOUND));

                    Integer targetCalories = log.getGoalCalories() != null ? log.getGoalCalories() : 0;
                    BigDecimal remainingCalories = BigDecimal.valueOf(targetCalories).subtract(log.getTotalCalories());
                    return toLogResponse(log, food, targetCalories, remainingCalories);
                })
                .toList();
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

    private LocalDateTime resolveLoggedAt(LocalDateTime loggedAt, LocalDate logDate) {
        if (loggedAt != null) {
            return loggedAt;
        }
        if (logDate != null) {
            return logDate.atStartOfDay();
        }
        return LocalDateTime.now();
    }

    private Foods resolveFoodByName(String foodName) {
        String normalized = foodName.trim();

        return foodsRepository.findFirstByNameIgnoreCase(normalized)
                .or(() -> foodsRepository.findFirstByNameContainingIgnoreCaseOrderByIdAsc(normalized))
                .orElseThrow(() -> new AppException(ErrorCode.FOOD_NOT_FOUND));
    }

    private BigDecimal calculateByGram(BigDecimal per100gValue, BigDecimal gram) {
        if (per100gValue == null) {
            return BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        }

        return gram.multiply(per100gValue)
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
    }

    private LogResponse toLogResponse(Logs log, Foods food, Integer targetCalories, BigDecimal remainingCalories) {
        return LogResponse.builder()
                .id(log.getId())
                .userId(log.getUser().getId())
                .foodId(food.getId())
                .foodName(food.getName())
                .gram(log.getGram())
                .totalCalories(log.getTotalCalories())
                .goalCalories(targetCalories)
                .remainingCalories(remainingCalories)
                .loggedAt(log.getLoggedAt())
                .build();
    }
}
