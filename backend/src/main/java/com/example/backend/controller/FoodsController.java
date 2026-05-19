package com.example.backend.controller;

import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.FoodResponse;
import com.example.backend.dto.request.CreateFoodRequest;
import com.example.backend.service.FoodCommandService;
import com.example.backend.service.FoodQueryService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("/api/v1/foods")
public class FoodsController {

    private final FoodQueryService foodQueryService;
    private final FoodCommandService foodCommandService;

    public FoodsController(FoodQueryService foodQueryService, FoodCommandService foodCommandService) {
        this.foodQueryService = foodQueryService;
        this.foodCommandService = foodCommandService;
    }

    @GetMapping
    public ApiResponse<Page<FoodResponse>> searchFoods(
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") @Min(value = 0, message = "page must be greater than or equal to 0") int page,
            @RequestParam(defaultValue = "10") @Min(value = 1, message = "size must be greater than or equal to 1") int size) {
        Page<FoodResponse> foods = foodQueryService.searchFoods(name, page, size);

        return ApiResponse.<Page<FoodResponse>>builder()
                .message("Foods fetched successfully")
                .data(foods)
                .build();
    }

    @PostMapping
    public ApiResponse<FoodResponse> createFood(@Valid @RequestBody CreateFoodRequest request) {
        FoodResponse created = foodCommandService.createFood(request);
        return ApiResponse.<FoodResponse>builder()
                .message("Food created successfully")
                .data(created)
                .build();
    }
}
