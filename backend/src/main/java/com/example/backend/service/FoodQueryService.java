package com.example.backend.service;

import com.example.backend.dto.response.FoodResponse;
import org.springframework.data.domain.Page;

public interface FoodQueryService {
    Page<FoodResponse> searchFoods(String name, int page, int size);

    FoodResponse getFoodDetail(Long foodId);
}
