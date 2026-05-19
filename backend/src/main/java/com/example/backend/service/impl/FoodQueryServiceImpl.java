package com.example.backend.service.impl;

import com.example.backend.dto.response.FoodResponse;
import com.example.backend.entity.Foods;
import com.example.backend.enums.ErrorCode;
import com.example.backend.exception.AppException;
import com.example.backend.repository.FoodsRepository;
import com.example.backend.service.FoodQueryService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class FoodQueryServiceImpl implements FoodQueryService {

    private final FoodsRepository foodsRepository;

    public FoodQueryServiceImpl(FoodsRepository foodsRepository) {
        this.foodsRepository = foodsRepository;
    }

    @Override
    @Cacheable(cacheNames = "foodSearch", key = "T(String).format('%s:%d:%d', (#name == null ? 'all' : #name.trim().toLowerCase()), #page, #size)")
    public Page<FoodResponse> searchFoods(String name, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);

        Page<Foods> foodsPage = (name == null || name.isBlank())
                ? foodsRepository.findAll(pageRequest)
                : foodsRepository.findByNameContainingIgnoreCase(name.trim(), pageRequest);

        return foodsPage.map(this::toResponse);
    }

    @Override
    @Cacheable(cacheNames = "foodDetail", key = "#foodId")
    public FoodResponse getFoodDetail(Long foodId) {
        Foods foods = foodsRepository.findById(foodId)
                .orElseThrow(() -> new AppException(ErrorCode.FOOD_NOT_FOUND));

        return toResponse(foods);
    }

    private FoodResponse toResponse(Foods foods) {
        return FoodResponse.builder()
                .id(foods.getId())
                .name(foods.getName())
                .protein(foods.getProtein())
                .carbs(foods.getCarbs())
                .fats(foods.getFats())
                .caloriesPer100g(foods.getCaloriesPer100g())
                .userId(foods.getUser() != null ? foods.getUser().getId() : null)
                .build();
    }
}
