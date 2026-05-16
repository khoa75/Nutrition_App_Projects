package com.nutrition.userprofile.service;

import com.nutrition.userprofile.dto.HealthMetricsRequest;
import com.nutrition.userprofile.dto.HealthMetricsResponse;
import com.nutrition.userprofile.dto.ProfileUpdateRequest;
import com.nutrition.userprofile.model.UserProfile;

public interface UserProfileService {
    HealthMetricsResponse calculateMetrics(HealthMetricsRequest request);
    UserProfile getProfile(String userId);
    UserProfile updateProfile(String userId, ProfileUpdateRequest request);
}
