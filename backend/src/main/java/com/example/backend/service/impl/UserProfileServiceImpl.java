package com.example.backend.service.impl;

import com.example.backend.dto.request.userprofile.GoalCaloriesRequest;
import com.example.backend.dto.response.userprofile.UserProfileResponse;
import com.example.backend.entity.UserWeightLog;
import com.example.backend.entity.Users;
import com.example.backend.enums.ErrorCode;
import com.example.backend.exception.AppException;
import com.example.backend.repository.UserWeightLogRepository;
import com.example.backend.repository.UsersRepository;
import com.example.backend.service.DailyCaloriePlanService;
import com.example.backend.service.HealthMetricsService;
import com.example.backend.service.UserProfileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Period;

@Service
public class UserProfileServiceImpl implements UserProfileService {

    private static final Logger logger = LoggerFactory.getLogger(UserProfileServiceImpl.class);

    private final UsersRepository usersRepository;
    private final UserWeightLogRepository userWeightLogRepository;
    private final HealthMetricsService healthMetricsService;
    private final DailyCaloriePlanService dailyCaloriePlanService;

    public UserProfileServiceImpl(UsersRepository usersRepository,
                                  UserWeightLogRepository userWeightLogRepository,
                                  HealthMetricsService healthMetricsService,
                                  DailyCaloriePlanService dailyCaloriePlanService) {
        this.usersRepository = usersRepository;
        this.userWeightLogRepository = userWeightLogRepository;
        this.healthMetricsService = healthMetricsService;
        this.dailyCaloriePlanService = dailyCaloriePlanService;
    }

    @Override
    @Transactional
    public UserProfileResponse updateGoalCalories(String email, GoalCaloriesRequest request) {
        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        logger.info("Updating goal calories for userId={} email={}", user.getId(), user.getEmail());

        user.setCurrentWeight(request.getCurrentWeight());
        user.setHeight(request.getHeight());
        user.setTargetWeight(request.getTargetWeight());
        user.setGender(request.getGender());
        user.setActivityLevel(request.getActivityLevel());
        user.setGoalType(request.getGoalType());
        user.setKgPerWeek(request.getKgPerWeek());

        BigDecimal bmi = healthMetricsService.calculateBmi(user.getCurrentWeight(), user.getHeight());
        user.setBmi(bmi);
        user.setBmiStatus(healthMetricsService.classifyBmi(bmi));

        int age = user.getDob() == null ? 18 : Period.between(user.getDob(), LocalDate.now()).getYears();
        BigDecimal goalCalories = healthMetricsService.calculateGoalCalories(
                user.getCurrentWeight(),
                user.getHeight(),
                age,
                user.getGender(),
                user.getActivityLevel(),
                user.getGoalType(),
                user.getKgPerWeek()
        );
        user.setGoalCalories(goalCalories.intValue());

        LocalDate today = LocalDate.now();
        userWeightLogRepository.findByUserIdAndLogDate(user.getId(), today)
                .ifPresentOrElse(existing -> {
                            existing.setWeight(user.getCurrentWeight());
                            logger.info("Updated existing weight log id={} for userId={} on {}", existing.getId(), user.getId(), today);
                        },
                        () -> {
                            userWeightLogRepository.save(UserWeightLog.builder()
                                    .user(user)
                                    .logDate(today)
                                    .weight(user.getCurrentWeight())
                                    .build());
                            logger.info("Created weight log for userId={} on {}", user.getId(), today);
                        });

        if (user.getGoalCalories() < 0) {
            throw new IllegalArgumentException("Calculated goal calories must not be negative");
        }

        usersRepository.save(user);

        dailyCaloriePlanService.generatePlanForUser(user, LocalDate.now(), 30);

        return toResponse(user);
    }

    @Override
    public UserProfileResponse getMyProfile(String email) {
        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        logger.debug("Fetched profile for userId={} email={}", user.getId(), user.getEmail());
        return toResponse(user);
    }

    private UserProfileResponse toResponse(Users user) {
        return UserProfileResponse.builder()
                .name(user.getName())
                .email(user.getEmail())
                .dob(user.getDob())
                .gender(user.getGender())
                .currentWeight(user.getCurrentWeight())
                .targetWeight(user.getTargetWeight())
                .height(user.getHeight())
                .activityLevel(user.getActivityLevel())
                .goalType(user.getGoalType())
                .kgPerWeek(user.getKgPerWeek())
                .bmi(user.getBmi())
                .bmiStatus(user.getBmiStatus())
                .goalCalories(user.getGoalCalories())
                .build();
    }
}
