package com.example.backend.service;

import com.example.backend.dto.request.DailyCaloriePlanRequest;
import com.example.backend.entity.DailyCaloriePlan;
import com.example.backend.entity.Users;
import com.example.backend.enums.WeightGoal;
import com.example.backend.repository.DailyCaloriePlanRepository;
import com.example.backend.repository.UsersRepository;
import com.example.backend.service.impl.NutritionPlanServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class NutritionPlanServiceImplTest {

    @Mock
    private UsersRepository usersRepository;
    @Mock
    private DailyCaloriePlanRepository dailyCaloriePlanRepository;

    @InjectMocks
    private NutritionPlanServiceImpl nutritionPlanService;

    @Test
    void calculateDailyTarget_ShouldReturnMaintainCalories() {
        DailyCaloriePlanRequest request = DailyCaloriePlanRequest.builder()
                .tdee(BigDecimal.valueOf(2200))
                .goalType(WeightGoal.MAINTAIN)
                .build();

        var response = nutritionPlanService.calculateDailyTarget(request);

        assertEquals(2200, response.getTargetCalories());
        assertEquals(0, response.getCalorieDelta());
    }

    @Test
    void calculateDailyTarget_ShouldReturnGainCalories() {
        DailyCaloriePlanRequest request = DailyCaloriePlanRequest.builder()
                .tdee(BigDecimal.valueOf(2200))
                .goalType(WeightGoal.GAIN)
                .build();

        var response = nutritionPlanService.calculateDailyTarget(request);

        assertEquals(2700, response.getTargetCalories());
        assertEquals(500, response.getCalorieDelta());
    }

    @Test
    void calculateDailyTarget_ShouldClampLowCalories_ForLoseGoal() {
        DailyCaloriePlanRequest request = DailyCaloriePlanRequest.builder()
                .tdee(BigDecimal.valueOf(1300))
                .goalType(WeightGoal.LOSE)
                .build();

        var response = nutritionPlanService.calculateDailyTarget(request);

        assertEquals(1200, response.getTargetCalories());
        assertEquals(500, response.getCalorieDelta());
    }

    @Test
    void getDailyPlan_ShouldReturnPlanByDate() {
        Users user = Users.builder().id(1L).email("john@example.com").build();
        DailyCaloriePlan plan = DailyCaloriePlan.builder()
                .planDate(LocalDate.of(2026, 5, 20))
                .baseTargetCalories(2200)
                .targetCalories(2200)
                .consumedCalories(BigDecimal.valueOf(1000))
                .remainingCalories(BigDecimal.valueOf(1200))
                .build();

        when(usersRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(dailyCaloriePlanRepository.findByUserIdAndPlanDate(1L, LocalDate.of(2026, 5, 20))).thenReturn(Optional.of(plan));

        var response = nutritionPlanService.getDailyPlan("john@example.com", LocalDate.of(2026, 5, 20));

        assertEquals(2200, response.getTargetCalories());
        assertEquals(LocalDate.of(2026, 5, 20), response.getPlanDate());
    }

    @Test
    void getWeeklyPlan_ShouldReturnSevenDaysRange() {
        Users user = Users.builder().id(1L).email("john@example.com").build();
        when(usersRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(dailyCaloriePlanRepository.findByUserIdAndPlanDateBetweenOrderByPlanDateAsc(
                1L, LocalDate.of(2026, 5, 20), LocalDate.of(2026, 5, 26)))
                .thenReturn(List.of(DailyCaloriePlan.builder()
                        .planDate(LocalDate.of(2026, 5, 20))
                        .baseTargetCalories(2200)
                        .targetCalories(2200)
                        .consumedCalories(BigDecimal.ZERO)
                        .remainingCalories(BigDecimal.valueOf(2200))
                        .build()));

        var response = nutritionPlanService.getWeeklyPlan("john@example.com", LocalDate.of(2026, 5, 20));

        assertEquals(1, response.getPlans().size());
        assertEquals(LocalDate.of(2026, 5, 20), response.getPlans().get(0).getPlanDate());
    }

    @Test
    void getMonthlyPlan_ShouldReturnMonthRange() {
        Users user = Users.builder().id(1L).email("john@example.com").build();
        when(usersRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(dailyCaloriePlanRepository.findByUserIdAndPlanDateBetweenOrderByPlanDateAsc(
                1L, LocalDate.of(2026, 5, 1), LocalDate.of(2026, 5, 31)))
                .thenReturn(List.of());

        var response = nutritionPlanService.getMonthlyPlan("john@example.com", YearMonth.of(2026, 5));

        assertEquals(0, response.getPlans().size());
    }
}
