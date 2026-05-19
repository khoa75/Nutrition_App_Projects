package com.example.backend.service;

import com.example.backend.dto.request.userprofile.GoalCaloriesRequest;
import com.example.backend.dto.response.userprofile.UserProfileResponse;

public interface UserProfileService {
    UserProfileResponse updateGoalCalories(String email, GoalCaloriesRequest request);

    UserProfileResponse getMyProfile(String email);
}
