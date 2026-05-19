package com.example.backend.service;

import com.example.backend.dto.request.CreateFoodRequest;
import com.example.backend.dto.response.FoodResponse;

public interface FoodCommandService {
    FoodResponse createFood(CreateFoodRequest request);

    FoodResponse updateFood(Long foodId, CreateFoodRequest request);
}
