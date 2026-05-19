package com.example.backend.service;

import com.example.backend.dto.request.CreateLogByNameRequest;
import com.example.backend.dto.request.CreateLogRequest;
import com.example.backend.dto.request.PreviewLogByNameRequest;
import com.example.backend.dto.request.UpdateLogGramRequest;
import com.example.backend.entity.Foods;
import com.example.backend.entity.LogFoods;
import com.example.backend.entity.LogFoodsId;
import com.example.backend.entity.Logs;
import com.example.backend.entity.Users;
import com.example.backend.repository.FoodsRepository;
import com.example.backend.repository.LogFoodsRepository;
import com.example.backend.repository.LogsRepository;
import com.example.backend.repository.UsersRepository;
import com.example.backend.service.impl.LogServiceImpl;
import com.example.backend.service.DailyCaloriePlanService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
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
class LogServiceImplTest {

    @Mock
    private LogsRepository logsRepository;
    @Mock
    private LogFoodsRepository logFoodsRepository;
    @Mock
    private FoodsRepository foodsRepository;
    @Mock
    private UsersRepository usersRepository;
    @Mock
    private DailyCaloriePlanService dailyCaloriePlanService;

    @InjectMocks
    private LogServiceImpl logService;

    @Test
    void createLog_ShouldCalculateTotalCalories() {
        Users user = Users.builder().id(1L).goalCalories(2200).build();
        Foods food = Foods.builder().id(2L).name("Rice").caloriesPer100g(BigDecimal.valueOf(130)).build();

        Logs saved = Logs.builder()
                .id(10L)
                .user(user)
                .gram(BigDecimal.valueOf(250))
                .totalCalories(BigDecimal.valueOf(325.00).setScale(2))
                .goalCalories(2200)
                .loggedAt(LocalDateTime.of(2026, 5, 19, 10, 0))
                .build();

        when(usersRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(foodsRepository.findById(2L)).thenReturn(Optional.of(food));
        when(logsRepository.save(any(Logs.class))).thenReturn(saved);
        when(logsRepository.sumTotalCaloriesByUserIdAndLoggedAtBetween(eq(1L), any(LocalDateTime.class), any(LocalDateTime.class)))
                .thenReturn(BigDecimal.valueOf(325.00).setScale(2));

        CreateLogRequest request = CreateLogRequest.builder()
                .foodId(2L)
                .gram(BigDecimal.valueOf(250))
                .loggedAt(LocalDateTime.of(2026, 5, 19, 10, 0))
                .build();

        var response = logService.createLog("john@example.com", request);

        assertEquals(BigDecimal.valueOf(325.00).setScale(2), response.getTotalCalories());
        assertEquals("Rice", response.getFoodName());
        assertEquals(BigDecimal.valueOf(1875.00).setScale(2), response.getRemainingCalories());
        verify(dailyCaloriePlanService).syncAndAdjust(1L, LocalDate.of(2026, 5, 19));
    }

    @Test
    void createLogByName_ShouldCalculateFromFoodName() {
        Users user = Users.builder().id(1L).goalCalories(2200).build();
        Foods food = Foods.builder()
                .id(2L)
                .name("White Rice")
                .protein(BigDecimal.valueOf(2.7))
                .carbs(BigDecimal.valueOf(28.0))
                .fats(BigDecimal.valueOf(0.3))
                .caloriesPer100g(BigDecimal.valueOf(130))
                .build();

        Logs saved = Logs.builder()
                .id(11L)
                .user(user)
                .gram(BigDecimal.valueOf(50))
                .totalCalories(BigDecimal.valueOf(65.00).setScale(2))
                .goalCalories(2200)
                .loggedAt(LocalDateTime.of(2026, 5, 19, 11, 0))
                .build();

        when(usersRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(foodsRepository.findFirstByNameIgnoreCase("rice")).thenReturn(Optional.empty());
        when(foodsRepository.findFirstByNameContainingIgnoreCaseOrderByIdAsc("rice")).thenReturn(Optional.of(food));
        when(logsRepository.save(any(Logs.class))).thenReturn(saved);
        when(logsRepository.sumTotalCaloriesByUserIdAndLoggedAtBetween(eq(1L), any(LocalDateTime.class), any(LocalDateTime.class)))
                .thenReturn(BigDecimal.valueOf(65.00).setScale(2));

        CreateLogByNameRequest request = CreateLogByNameRequest.builder()
                .foodName("rice")
                .gram(BigDecimal.valueOf(50))
                .build();

        var response = logService.createLogByName("john@example.com", request);

        assertEquals("White Rice", response.getFoodName());
        assertEquals(BigDecimal.valueOf(65.00).setScale(2), response.getTotalCalories());
        verify(dailyCaloriePlanService).syncAndAdjust(1L, LocalDate.of(2026, 5, 19));
    }

    @Test
    void previewLogByName_ShouldCalculateMacrosByGram() {
        Foods food = Foods.builder()
                .id(2L)
                .name("White Rice")
                .protein(BigDecimal.valueOf(2.7))
                .carbs(BigDecimal.valueOf(28.0))
                .fats(BigDecimal.valueOf(0.3))
                .caloriesPer100g(BigDecimal.valueOf(130))
                .build();

        when(foodsRepository.findFirstByNameIgnoreCase("rice")).thenReturn(Optional.of(food));

        PreviewLogByNameRequest request = PreviewLogByNameRequest.builder()
                .foodName("rice")
                .gram(BigDecimal.valueOf(50))
                .build();

        var response = logService.previewLogByName(request);

        assertEquals("White Rice", response.getFoodName());
        assertEquals(BigDecimal.valueOf(65.00).setScale(2), response.getCalories());
        assertEquals(BigDecimal.valueOf(1.35).setScale(2), response.getProtein());
        assertEquals(BigDecimal.valueOf(14.00).setScale(2), response.getCarbs());
        assertEquals(BigDecimal.valueOf(0.15).setScale(2), response.getFats());
    }

    @Test
    void deleteLog_ShouldDeleteMappingAndLog() {
        Users user = Users.builder().id(1L).email("john@example.com").build();
        Logs existing = Logs.builder()
                .id(10L)
                .user(user)
                .loggedAt(LocalDateTime.of(2026, 5, 19, 12, 0))
                .build();

        when(logsRepository.findByIdAndUserEmail(10L, "john@example.com")).thenReturn(Optional.of(existing));

        logService.deleteLog("john@example.com", 10L);

        verify(logFoodsRepository).deleteByLogs_Id(10L);
        verify(logsRepository).delete(existing);
        verify(dailyCaloriePlanService).syncAndAdjust(1L, LocalDate.of(2026, 5, 19));
    }

    @Test
    void getLogsByDate_ShouldReturnMappedLogs() {
        Users user = Users.builder().id(1L).email("john@example.com").goalCalories(2200).build();
        Foods food = Foods.builder().id(2L).name("Rice").build();

        Logs log = Logs.builder()
                .id(10L)
                .user(user)
                .gram(BigDecimal.valueOf(100))
                .totalCalories(BigDecimal.valueOf(130.00).setScale(2))
                .goalCalories(2200)
                .loggedAt(LocalDateTime.of(2026, 5, 20, 8, 0))
                .build();

        LogFoods link = LogFoods.builder()
                .id(new LogFoodsId(10L, 2L))
                .logs(log)
                .food(food)
                .build();

        when(usersRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(logsRepository.findByUserIdAndLoggedAtBetweenOrderByLoggedAtDesc(eq(1L), any(LocalDateTime.class), any(LocalDateTime.class)))
                .thenReturn(List.of(log));
        when(logFoodsRepository.findFirstByLogs_Id(10L)).thenReturn(Optional.of(link));

        var result = logService.getLogsByDate("john@example.com", LocalDate.of(2026, 5, 20));

        assertEquals(1, result.size());
        assertEquals("Rice", result.get(0).getFoodName());
        assertEquals(BigDecimal.valueOf(2070.00).setScale(2), result.get(0).getRemainingCalories());
    }

    @Test
    void getLogsByDateRange_ShouldReturnMappedLogs() {
        Users user = Users.builder().id(1L).email("john@example.com").goalCalories(2200).build();
        Foods food = Foods.builder().id(2L).name("Rice").build();

        Logs log = Logs.builder()
                .id(10L)
                .user(user)
                .gram(BigDecimal.valueOf(100))
                .totalCalories(BigDecimal.valueOf(130.00).setScale(2))
                .goalCalories(2200)
                .loggedAt(LocalDateTime.of(2026, 5, 2, 8, 0))
                .build();

        LogFoods link = LogFoods.builder()
                .id(new LogFoodsId(10L, 2L))
                .logs(log)
                .food(food)
                .build();

        when(usersRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(logsRepository.findByUserIdAndLoggedAtBetweenOrderByLoggedAtDesc(eq(1L), any(LocalDateTime.class), any(LocalDateTime.class)))
                .thenReturn(List.of(log));
        when(logFoodsRepository.findFirstByLogs_Id(10L)).thenReturn(Optional.of(link));

        var result = logService.getLogsByDateRange("john@example.com", LocalDate.of(2026, 5, 1), LocalDate.of(2026, 5, 7));

        assertEquals(1, result.size());
        assertEquals("Rice", result.get(0).getFoodName());
    }

    @Test
    void updateLogGram_ShouldRecalculateCalories() {
        Users user = Users.builder().id(1L).email("john@example.com").goalCalories(2200).build();
        Foods food = Foods.builder().id(2L).name("Rice").caloriesPer100g(BigDecimal.valueOf(130)).build();

        Logs existing = Logs.builder()
                .id(10L)
                .user(user)
                .gram(BigDecimal.valueOf(250))
                .totalCalories(BigDecimal.valueOf(325.00).setScale(2))
                .goalCalories(2200)
                .loggedAt(LocalDateTime.of(2026, 5, 19, 10, 0))
                .build();

        LogFoods link = LogFoods.builder()
                .id(new LogFoodsId(10L, 2L))
                .logs(existing)
                .food(food)
                .build();

        when(logsRepository.findByIdAndUserEmail(10L, "john@example.com")).thenReturn(Optional.of(existing));
        when(logFoodsRepository.findFirstByLogs_Id(10L)).thenReturn(Optional.of(link));
        when(logsRepository.save(any(Logs.class))).thenReturn(existing);
        when(logsRepository.sumTotalCaloriesByUserIdAndLoggedAtBetween(eq(1L), any(LocalDateTime.class), any(LocalDateTime.class)))
                .thenReturn(BigDecimal.valueOf(260.00).setScale(2));

        UpdateLogGramRequest request = UpdateLogGramRequest.builder()
                .gram(BigDecimal.valueOf(200))
                .build();

        var response = logService.updateLogGram("john@example.com", 10L, request);

        assertEquals(BigDecimal.valueOf(200), response.getGram());
        assertEquals(BigDecimal.valueOf(260.00).setScale(2), response.getTotalCalories());
        assertEquals(BigDecimal.valueOf(1940.00).setScale(2), response.getRemainingCalories());
        verify(dailyCaloriePlanService).syncAndAdjust(1L, LocalDate.of(2026, 5, 19));
    }
}
