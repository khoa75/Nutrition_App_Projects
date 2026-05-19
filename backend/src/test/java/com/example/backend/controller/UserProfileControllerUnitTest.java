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
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

class UserProfileControllerUnitTest {

    private final UserProfileService userProfileService = Mockito.mock(UserProfileService.class);
    private final UserQueryService userQueryService = Mockito.mock(UserQueryService.class);
    private final UserProfileController controller = new UserProfileController(userProfileService, userQueryService);

    @Test
    void updateGoalCalories_ShouldWrapResponseInApiResponse() {
        UserProfileResponse profileResponse = UserProfileResponse.builder()
                .goalCalories(2200)
                .build();

        when(userProfileService.updateGoalCalories(any(), any())).thenReturn(profileResponse);

        Principal principal = () -> "john@example.com";
        GoalCaloriesRequest request = GoalCaloriesRequest.builder()
                .currentWeight(BigDecimal.valueOf(70))
                .height(BigDecimal.valueOf(175))
                .targetWeight(BigDecimal.valueOf(65))
                .gender("MALE")
                .build();

        ApiResponse<GoalCaloriesResponse> response = controller.updateGoalCalories(principal, request);

        assertTrue(response.isSuccess());
        assertEquals(2200, response.getData().getGoalCalories());
    }

    @Test
    void getMyProfile_ShouldWrapResponseInApiResponse() {
        UserProfileResponse profileResponse = UserProfileResponse.builder()
                .email("john@example.com")
                .goalCalories(2200)
                .build();

        when(userProfileService.getMyProfile("john@example.com")).thenReturn(profileResponse);

        Principal principal = () -> "john@example.com";
        ApiResponse<UserProfileResponse> response = controller.getMyProfile(principal);

        assertTrue(response.isSuccess());
        assertEquals("john@example.com", response.getData().getEmail());
    }

    @Test
    void searchUsersByEmail_ShouldWrapResponse() {
        when(userQueryService.searchUsers(eq("john@example.com"), eq(null)))
                .thenReturn(List.of(UserResponse.builder()
                        .id(1L)
                        .name("John")
                        .email("john@example.com")
                        .status(UserStatus.ACTIVE)
                        .build()));

        ApiResponse<List<UserResponse>> response = controller.searchUsersByEmail("john@example.com");

        assertTrue(response.isSuccess());
        assertEquals(1, response.getData().size());
        assertEquals("john@example.com", response.getData().get(0).getEmail());
    }

    @Test
    void filterUsersByStatus_ShouldWrapResponse() {
        when(userQueryService.searchUsers(eq(null), eq(UserStatus.ACTIVE)))
                .thenReturn(List.of(UserResponse.builder()
                        .id(1L)
                        .name("John")
                        .email("john@example.com")
                        .status(UserStatus.ACTIVE)
                        .build()));

        ApiResponse<List<UserResponse>> response = controller.filterUsersByStatus("ACTIVE");

        assertTrue(response.isSuccess());
        assertEquals(1, response.getData().size());
        assertEquals(UserStatus.ACTIVE, response.getData().get(0).getStatus());
    }

    @Test
    void updateGoalCalories_ShouldThrowUnauthenticated_WhenPrincipalMissing() {
        GoalCaloriesRequest request = GoalCaloriesRequest.builder()
                .currentWeight(BigDecimal.valueOf(70))
                .height(BigDecimal.valueOf(175))
                .targetWeight(BigDecimal.valueOf(65))
                .gender("MALE")
                .build();

        AppException exception = assertThrows(AppException.class,
                () -> controller.updateGoalCalories(null, request));

        assertEquals(ErrorCode.UNAUTHENTICATED, exception.getErrorCode());
    }
}
