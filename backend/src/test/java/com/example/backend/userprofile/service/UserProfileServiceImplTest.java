package com.example.backend.userprofile.service;

import com.example.backend.dto.request.userprofile.GoalCaloriesRequest;
import com.example.backend.dto.response.userprofile.UserProfileResponse;
import com.example.backend.entity.Users;
import com.example.backend.enums.ActivityLevelEnum;
import com.example.backend.enums.BmiStatusEnum;
import com.example.backend.enums.ErrorCode;
import com.example.backend.enums.WeightGoal;
import com.example.backend.exception.AppException;
import com.example.backend.repository.UsersRepository;
import com.example.backend.entity.UserWeightLog;
import com.example.backend.repository.UserWeightLogRepository;
import com.example.backend.service.DailyCaloriePlanService;
import com.example.backend.service.impl.UserProfileServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserProfileServiceImplTest {

    @Mock
    private UsersRepository usersRepository;
    @Mock
    private UserWeightLogRepository userWeightLogRepository;
    @Mock
    private com.example.backend.service.HealthMetricsService healthMetricsService;
    @Mock
    private DailyCaloriePlanService dailyCaloriePlanService;

    @InjectMocks
    private UserProfileServiceImpl userProfileService;

    private Users user;

    @BeforeEach
    void setUp() {
        user = Users.builder()
                .id(1L)
                .email("john@example.com")
                .name("John")
                .dob(LocalDate.of(1995, 1, 1))
                .gender("MALE")
                .currentWeight(BigDecimal.valueOf(70))
                .height(BigDecimal.valueOf(175))
                .activityLevel(ActivityLevelEnum.ACTIVE)
                .goalType(WeightGoal.MAINTAIN)
                .kgPerWeek(BigDecimal.ZERO)
                .build();
    }

    @Test
    void updateGoalCalories_ShouldUpdateProfileAndInsertWeightLog_WhenNoSameDayLog() {
        GoalCaloriesRequest request = GoalCaloriesRequest.builder()
                .currentWeight(BigDecimal.valueOf(72))
                .height(BigDecimal.valueOf(176))
                .targetWeight(BigDecimal.valueOf(65))
                .gender("MALE")
                .activityLevel(ActivityLevelEnum.ACTIVE)
                .goalType(WeightGoal.LOSE)
                .kgPerWeek(BigDecimal.valueOf(0.5))
                .build();

        when(usersRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(healthMetricsService.calculateBmi(any(), any())).thenReturn(new BigDecimal("23.24"));
        when(healthMetricsService.classifyBmi(any())).thenReturn(BmiStatusEnum.NORMAL);
        when(healthMetricsService.calculateGoalCalories(any(), any(), anyInt(), anyString(), any(), any(), any()))
                .thenReturn(new BigDecimal("2300.00"));
        when(userWeightLogRepository.findByUserIdAndLogDate(eq(1L), any(LocalDate.class))).thenReturn(Optional.empty());

        UserProfileResponse response = userProfileService.updateGoalCalories("john@example.com", request);

        assertEquals(2300, response.getGoalCalories());
        assertEquals(new BigDecimal("23.24"), response.getBmi());
        assertEquals(BigDecimal.valueOf(65), response.getTargetWeight());
        verify(userWeightLogRepository).save(any(UserWeightLog.class));
        verify(usersRepository).save(user);
        verify(dailyCaloriePlanService).generatePlanForUser(eq(user), any(LocalDate.class), eq(30));
    }

    @Test
    void updateGoalCalories_ShouldUpdateWeightLog_WhenSameDayLogExists() {
        GoalCaloriesRequest request = GoalCaloriesRequest.builder()
                .currentWeight(BigDecimal.valueOf(72))
                .height(BigDecimal.valueOf(176))
                .targetWeight(BigDecimal.valueOf(65))
                .gender("MALE")
                .activityLevel(ActivityLevelEnum.ACTIVE)
                .goalType(WeightGoal.LOSE)
                .kgPerWeek(BigDecimal.valueOf(0.5))
                .build();

        UserWeightLog existing = UserWeightLog.builder()
                .id(10L)
                .user(user)
                .logDate(LocalDate.now())
                .weight(BigDecimal.valueOf(70))
                .build();

        when(usersRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(healthMetricsService.calculateBmi(any(), any())).thenReturn(new BigDecimal("23.24"));
        when(healthMetricsService.classifyBmi(any())).thenReturn(BmiStatusEnum.NORMAL);
        when(healthMetricsService.calculateGoalCalories(any(), any(), anyInt(), anyString(), any(), any(), any()))
                .thenReturn(new BigDecimal("2300.00"));
        when(userWeightLogRepository.findByUserIdAndLogDate(eq(1L), any(LocalDate.class))).thenReturn(Optional.of(existing));

        userProfileService.updateGoalCalories("john@example.com", request);

        assertEquals(BigDecimal.valueOf(72), existing.getWeight());
        verify(userWeightLogRepository, never()).save(any(UserWeightLog.class));
    }

    @Test
    void getMyProfile_ShouldThrow_WhenUserMissing() {
        when(usersRepository.findByEmail("john@example.com")).thenReturn(Optional.empty());

        AppException exception = assertThrows(AppException.class,
                () -> userProfileService.getMyProfile("john@example.com"));

        assertEquals(ErrorCode.USER_NOT_FOUND, exception.getErrorCode());
    }
}
