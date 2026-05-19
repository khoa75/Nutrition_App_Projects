package com.example.backend.service;

import com.example.backend.dto.request.CreateLogRequest;
import com.example.backend.entity.Foods;
import com.example.backend.entity.Logs;
import com.example.backend.entity.Users;
import com.example.backend.repository.FoodsRepository;
import com.example.backend.repository.LogFoodsRepository;
import com.example.backend.repository.LogsRepository;
import com.example.backend.repository.UsersRepository;
import com.example.backend.service.impl.LogServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
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
    }
}
