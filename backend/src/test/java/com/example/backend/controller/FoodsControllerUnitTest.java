package com.example.backend.controller;

import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.FoodResponse;
import com.example.backend.service.FoodCommandService;
import com.example.backend.service.FoodQueryService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

class FoodsControllerUnitTest {

    @Test
    void searchFoods_ShouldWrapInApiResponse() {
        FoodQueryService foodQueryService = Mockito.mock(FoodQueryService.class);
        FoodCommandService foodCommandService = Mockito.mock(FoodCommandService.class);
        FoodsController controller = new FoodsController(foodQueryService, foodCommandService);

        FoodResponse food = FoodResponse.builder()
                .id(1L)
                .name("White Rice")
                .protein(BigDecimal.valueOf(2.7))
                .carbs(BigDecimal.valueOf(28.0))
                .fats(BigDecimal.valueOf(0.3))
                .caloriesPer100g(BigDecimal.valueOf(130.0))
                .build();

        Page<FoodResponse> page = new PageImpl<>(List.of(food));
        when(foodQueryService.searchFoods(eq("rice"), eq(0), eq(10))).thenReturn(page);

        ApiResponse<Page<FoodResponse>> response = controller.searchFoods("rice", 0, 10);

        assertTrue(response.isSuccess());
        assertEquals("Foods fetched successfully", response.getMessage());
        assertEquals(1, response.getData().getTotalElements());
    }
}
