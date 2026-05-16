package com.nutrition.userprofile.controller;

import com.nutrition.common.dto.ApiResponse;
import com.nutrition.userprofile.dto.HealthMetricsRequest;
import com.nutrition.userprofile.dto.HealthMetricsResponse;
import com.nutrition.userprofile.dto.ProfileUpdateRequest;
import com.nutrition.userprofile.service.UserProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService profileService;

    @PostMapping("/metrics")
    public ResponseEntity<ApiResponse<HealthMetricsResponse>> calculateMetrics(
            @Valid @RequestBody HealthMetricsRequest request) {
        var result = profileService.calculateMetrics(request);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<?>> getProfile(@PathVariable String userId) {
        var profile = profileService.getProfile(userId);
        return ResponseEntity.ok(ApiResponse.ok(profile));
    }

    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse<?>> updateProfile(
            @PathVariable String userId,
            @RequestBody ProfileUpdateRequest request) {
        var profile = profileService.updateProfile(userId, request);
        return ResponseEntity.ok(ApiResponse.ok("Profile updated", profile));
    }
}
