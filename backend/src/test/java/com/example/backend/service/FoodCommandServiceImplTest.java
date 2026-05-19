package com.example.backend.service;

import com.example.backend.dto.request.CreateFoodRequest;
import com.example.backend.entity.Foods;
import com.example.backend.repository.FoodsRepository;
import com.example.backend.repository.UsersRepository;
import com.example.backend.service.impl.FoodCommandServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FoodCommandServiceImplTest {

    @Mock
    private FoodsRepository foodsRepository;
    @Mock
    private UsersRepository usersRepository;

    @InjectMocks
    private FoodCommandServiceImpl foodCommandService;

    @Test
    void updateFood_ShouldUpdateFields_WhenFoodExists() {
        Foods existing = Foods.builder()
                .id(1L)
                .name("White Rice")
                .protein(BigDecimal.valueOf(2.7))
                .carbs(BigDecimal.valueOf(28.0))
                .fats(BigDecimal.valueOf(0.3))
                .caloriesPer100g(BigDecimal.valueOf(130.0))
                .build();

        when(foodsRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(foodsRepository.save(any(Foods.class))).thenReturn(existing);

        CreateFoodRequest request = CreateFoodRequest.builder()
                .name("Brown Rice")
                .protein(BigDecimal.valueOf(2.6))
                .carbs(BigDecimal.valueOf(23.0))
                .fats(BigDecimal.valueOf(0.9))
                .caloriesPer100g(BigDecimal.valueOf(111.0))
                .build();

        var response = foodCommandService.updateFood(1L, request);

        assertEquals("Brown Rice", response.getName());
        assertEquals(BigDecimal.valueOf(2.6), response.getProtein());
        assertEquals(BigDecimal.valueOf(23.0), response.getCarbs());
        assertEquals(BigDecimal.valueOf(0.9), response.getFats());
        assertEquals(BigDecimal.valueOf(111.0), response.getCaloriesPer100g());
        verify(foodsRepository).save(existing);
    }
}
