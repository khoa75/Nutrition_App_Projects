package com.example.backend.service;

import com.example.backend.dto.request.userprofile.GoalCaloriesRequest;
import com.example.backend.dto.response.UserResponse;
import com.example.backend.dto.response.userprofile.UserProfileResponse;

import java.util.List;

public interface UserProfileService {
    UserProfileResponse updateProfile(String email, GoalCaloriesRequest request);

    UserProfileResponse updateGoalCalories(String email, GoalCaloriesRequest request);

    UserProfileResponse getMyProfile(String email);

    List<UserResponse> getAllUsers();
}
