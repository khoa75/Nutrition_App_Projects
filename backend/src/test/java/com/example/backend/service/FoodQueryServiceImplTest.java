package com.example.backend.service;

import com.example.backend.entity.Foods;
import com.example.backend.exception.AppException;
import com.example.backend.repository.FoodsRepository;
import com.example.backend.service.impl.FoodQueryServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FoodQueryServiceImplTest {

    @Mock
    private FoodsRepository foodsRepository;

    @InjectMocks
    private FoodQueryServiceImpl foodQueryService;

    @Test
    void searchFoods_ShouldUseNameFilter_WhenNameProvided() {
        Foods foods = Foods.builder()
                .id(1L)
                .name("Brown Rice")
                .protein(BigDecimal.valueOf(2.6))
                .carbs(BigDecimal.valueOf(23.0))
                .fats(BigDecimal.valueOf(0.9))
                .caloriesPer100g(BigDecimal.valueOf(111.0))
                .build();

        Page<Foods> page = new PageImpl<>(List.of(foods), PageRequest.of(0, 10), 1);
        when(foodsRepository.findByNameContainingIgnoreCase(eq("rice"), any(PageRequest.class))).thenReturn(page);

        var result = foodQueryService.searchFoods("rice", 0, 10);

        assertEquals(1, result.getTotalElements());
        assertEquals("Brown Rice", result.getContent().get(0).getName());
        verify(foodsRepository).findByNameContainingIgnoreCase(eq("rice"), any(PageRequest.class));
    }

    @Test
    void searchFoods_ShouldReturnAllPaged_WhenNameBlank() {
        Foods foods = Foods.builder()
                .id(2L)
                .name("Chicken Breast")
                .protein(BigDecimal.valueOf(31.0))
                .carbs(BigDecimal.ZERO)
                .fats(BigDecimal.valueOf(3.6))
                .caloriesPer100g(BigDecimal.valueOf(165.0))
                .build();

        Page<Foods> page = new PageImpl<>(List.of(foods), PageRequest.of(0, 10), 1);
        when(foodsRepository.findAll(any(PageRequest.class))).thenReturn(page);

        var result = foodQueryService.searchFoods("   ", 0, 10);

        assertEquals(1, result.getTotalElements());
        assertEquals("Chicken Breast", result.getContent().get(0).getName());
        verify(foodsRepository).findAll(any(PageRequest.class));
    }

    @Test
    void getFoodDetail_ShouldReturnFood_WhenFoodExists() {
        Foods foods = Foods.builder()
                .id(5L)
                .name("Boiled Egg")
                .protein(BigDecimal.valueOf(13.0))
                .carbs(BigDecimal.valueOf(1.1))
                .fats(BigDecimal.valueOf(11.0))
                .caloriesPer100g(BigDecimal.valueOf(155.0))
                .build();

        when(foodsRepository.findById(5L)).thenReturn(Optional.of(foods));

        var result = foodQueryService.getFoodDetail(5L);

        assertEquals(5L, result.getId());
        assertEquals("Boiled Egg", result.getName());
        verify(foodsRepository).findById(5L);
    }

    @Test
    void getFoodDetail_ShouldThrowAppException_WhenFoodNotFound() {
        when(foodsRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(AppException.class, () -> foodQueryService.getFoodDetail(99L));
        verify(foodsRepository).findById(99L);
    }
}
