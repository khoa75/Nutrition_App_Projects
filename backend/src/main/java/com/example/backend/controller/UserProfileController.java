package com.example.backend.controller;

import com.example.backend.dto.request.userprofile.GoalCaloriesRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.UserResponse;
import com.example.backend.dto.response.userprofile.GoalCaloriesResponse;
import com.example.backend.dto.response.userprofile.UserProfileResponse;
import com.example.backend.enums.ErrorCode;
import com.example.backend.enums.UserStatus;
import com.example.backend.exception.AppException;
import com.example.backend.service.UserProfileService;
import com.example.backend.service.UserQueryService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/api/users")
public class UserProfileController {

    private final UserProfileService userProfileService;
    private final UserQueryService userQueryService;

    public UserProfileController(UserProfileService userProfileService, UserQueryService userQueryService) {
        this.userProfileService = userProfileService;
        this.userQueryService = userQueryService;
    }

    @PutMapping("/me/goal-calories")
    public ApiResponse<GoalCaloriesResponse> updateGoalCalories(Principal principal,
                                                                 @Valid @RequestBody GoalCaloriesRequest request) {
        UserProfileResponse profile = userProfileService.updateGoalCalories(requireEmail(principal), request);

        return ApiResponse.<GoalCaloriesResponse>builder()
                .data(GoalCaloriesResponse.builder().goalCalories(profile.getGoalCalories()).build())
                .message("Goal calories updated successfully")
                .build();
    }

    @GetMapping("/me")
    public ApiResponse<UserProfileResponse> getMyProfile(Principal principal) {
        UserProfileResponse profile = userProfileService.getMyProfile(requireEmail(principal));
        return ApiResponse.<UserProfileResponse>builder()
                .data(profile)
                .message("Profile fetched successfully")
                .build();
    }

    @GetMapping("/profiles/search")
    public ApiResponse<List<UserResponse>> searchUsersByEmail(@RequestParam String email) {
        List<UserResponse> users = userQueryService.searchUsers(email, null);

        return ApiResponse.<List<UserResponse>>builder()
                .message("Users fetched successfully")
                .data(users)
                .build();
    }

    @GetMapping("/profiles/filter")
    public ApiResponse<List<UserResponse>> filterUsersByStatus(@RequestParam(defaultValue = "ALL") String status) {
        UserStatus userStatus = parseStatus(status);
        List<UserResponse> users = userQueryService.searchUsers(null, userStatus);

        return ApiResponse.<List<UserResponse>>builder()
                .message("Users fetched successfully")
                .data(users)
                .build();
    }

    private UserStatus parseStatus(String status) {
        if (status == null || status.isBlank()) {
            return null;
        }

        String normalized = status.trim().toUpperCase(Locale.ROOT);
        return switch (normalized) {
            case "ALL" -> null;
            case "ACTIVE" -> UserStatus.ACTIVE;
            case "LOCKED", "LOCK" -> UserStatus.LOCK;
            default -> null;
        };
    }

    private String requireEmail(Principal principal) {
        if (principal == null || principal.getName() == null || principal.getName().isBlank()) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        return principal.getName();
    }
}
