package com.example.backend.service.impl;

import com.example.backend.dto.request.CreateFoodRequest;
import com.example.backend.dto.response.FoodResponse;
import com.example.backend.entity.Foods;
import com.example.backend.entity.Users;
import com.example.backend.enums.ErrorCode;
import com.example.backend.exception.AppException;
import com.example.backend.repository.FoodsRepository;
import com.example.backend.repository.UsersRepository;
import com.example.backend.service.FoodCommandService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FoodCommandServiceImpl implements FoodCommandService {

    private static final Logger logger = LoggerFactory.getLogger(FoodCommandServiceImpl.class);

    private final FoodsRepository foodsRepository;
    private final UsersRepository usersRepository;

    public FoodCommandServiceImpl(FoodsRepository foodsRepository, UsersRepository usersRepository) {
        this.foodsRepository = foodsRepository;
        this.usersRepository = usersRepository;
    }

    @Override
    @Transactional
    @CacheEvict(cacheNames = {"foodSearch", "foodDetail"}, allEntries = true)
    public FoodResponse createFood(CreateFoodRequest request) {
        Users user = null;
        if (request.getUserId() != null) {
            user = usersRepository.findById(request.getUserId())
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        }

        Foods foods = Foods.builder()
                .name(request.getName().trim())
                .protein(request.getProtein())
                .carbs(request.getCarbs())
                .fats(request.getFats())
                .caloriesPer100g(request.getCaloriesPer100g())
                .user(user)
                .build();

        Foods saved = foodsRepository.save(foods);
        logger.info("Created food id={} name={} userId={}", saved.getId(), saved.getName(), user != null ? user.getId() : null);
        return toResponse(saved);
    }

    @Override
    @Transactional
    @CacheEvict(cacheNames = {"foodSearch", "foodDetail"}, allEntries = true)
    public FoodResponse updateFood(Long foodId, CreateFoodRequest request) {
        Foods foods = foodsRepository.findById(foodId)
                .orElseThrow(() -> new AppException(ErrorCode.FOOD_NOT_FOUND));

        Users user = null;
        if (request.getUserId() != null) {
            user = usersRepository.findById(request.getUserId())
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        }

        foods.setName(request.getName().trim());
        foods.setProtein(request.getProtein());
        foods.setCarbs(request.getCarbs());
        foods.setFats(request.getFats());
        foods.setCaloriesPer100g(request.getCaloriesPer100g());
        foods.setUser(user);

        Foods saved = foodsRepository.save(foods);
        logger.info("Updated food id={} name={} userId={}", saved.getId(), saved.getName(), user != null ? user.getId() : null);
        return toResponse(saved);
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
