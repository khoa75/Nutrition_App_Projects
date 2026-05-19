package com.example.backend.service;

import com.example.backend.entity.DailyCaloriePlan;
import com.example.backend.entity.Users;
import com.example.backend.repository.DailyCaloriePlanRepository;
import com.example.backend.repository.LogsRepository;
import com.example.backend.service.impl.DailyCaloriePlanServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DailyCaloriePlanServiceImplTest {

    @Mock
    private DailyCaloriePlanRepository dailyCaloriePlanRepository;
    @Mock
    private LogsRepository logsRepository;

    @InjectMocks
    private DailyCaloriePlanServiceImpl dailyCaloriePlanService;

    @Test
    void generatePlanForUser_ShouldCreate30DailyPlans() {
        Users user = Users.builder().id(1L).goalCalories(2200).build();

        dailyCaloriePlanService.generatePlanForUser(user, LocalDate.of(2026, 5, 20), 30);

        verify(dailyCaloriePlanRepository).deleteByUserIdAndPlanDateGreaterThanEqual(1L, LocalDate.of(2026, 5, 20));

        ArgumentCaptor<List<DailyCaloriePlan>> captor = ArgumentCaptor.forClass(List.class);
        verify(dailyCaloriePlanRepository).saveAll(captor.capture());
        assertEquals(30, captor.getValue().size());
        assertEquals(LocalDate.of(2026, 5, 20), captor.getValue().get(0).getPlanDate());
    }

    @Test
    void syncAndAdjust_ShouldUpdateTodayAndNextDayTarget() {
        DailyCaloriePlan today = DailyCaloriePlan.builder()
                .id(1L)
                .planDate(LocalDate.of(2026, 5, 20))
                .targetCalories(2200)
                .baseTargetCalories(2200)
                .consumedCalories(BigDecimal.ZERO)
                .remainingCalories(BigDecimal.valueOf(2200))
                .build();

        DailyCaloriePlan nextDay = DailyCaloriePlan.builder()
                .id(2L)
                .planDate(LocalDate.of(2026, 5, 21))
                .targetCalories(2200)
                .baseTargetCalories(2200)
                .consumedCalories(BigDecimal.ZERO)
                .remainingCalories(BigDecimal.valueOf(2200))
                .build();

        when(dailyCaloriePlanRepository.findByUserIdAndPlanDate(1L, LocalDate.of(2026, 5, 20))).thenReturn(Optional.of(today));
        when(dailyCaloriePlanRepository.findByUserIdAndPlanDate(1L, LocalDate.of(2026, 5, 21))).thenReturn(Optional.of(nextDay));
        when(logsRepository.sumTotalCaloriesByUserIdAndLoggedAtBetween(eq(1L), any(LocalDateTime.class), any(LocalDateTime.class)))
                .thenReturn(BigDecimal.valueOf(2500));

        dailyCaloriePlanService.syncAndAdjust(1L, LocalDate.of(2026, 5, 20));

        assertEquals(BigDecimal.valueOf(-300.00).setScale(2), today.getRemainingCalories());
        assertEquals(1900, nextDay.getTargetCalories());
        verify(dailyCaloriePlanRepository).save(today);
        verify(dailyCaloriePlanRepository).save(nextDay);
    }
}
