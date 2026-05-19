package com.example.backend.admin.controller;

import com.example.backend.admin.dto.request.AdminUpdateUserStatusRequest;
import com.example.backend.admin.dto.response.AdminUserStatusUpdateResponse;
import com.example.backend.admin.dto.response.AdminUserSummaryResponse;
import com.example.backend.admin.service.AdminUserService;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.enums.UserStatus;
import com.example.backend.enums.WeightGoal;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    private final AdminUserService adminUserService;

    public AdminUserController(AdminUserService adminUserService) {
        this.adminUserService = adminUserService;
    }

    @GetMapping
    public ApiResponse<Page<AdminUserSummaryResponse>> getUsers(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) UserStatus status,
            @RequestParam(required = false) WeightGoal goal,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ApiResponse.<Page<AdminUserSummaryResponse>>builder()
                .message("Get admin users successfully")
                .data(adminUserService.getUsers(search, status, goal, page, size))
                .build();
    }

    @PostMapping("/{id}/status")
    public ApiResponse<AdminUserStatusUpdateResponse> updateUserStatus(@PathVariable("id") Long userId,
                                                                        @Valid @RequestBody AdminUpdateUserStatusRequest request,
                                                                        Authentication authentication,
                                                                        HttpServletRequest httpServletRequest) {
        String actorEmail = authentication == null ? "unknown" : authentication.getName();
        String ipAddress = resolveClientIp(httpServletRequest);
        return ApiResponse.<AdminUserStatusUpdateResponse>builder()
                .message("Update user status successfully")
                .data(adminUserService.updateUserStatus(userId, request.getAction(), actorEmail, ipAddress))
                .build();
    }

    private String resolveClientIp(HttpServletRequest request) {
        String forwardedFor = request.getHeader("X-Forwarded-For");
        if (forwardedFor != null && !forwardedFor.isBlank()) {
            return forwardedFor.split(",")[0].trim();
        }
        String realIp = request.getHeader("X-Real-IP");
        if (realIp != null && !realIp.isBlank()) {
            return realIp.trim();
        }
        return request.getRemoteAddr();
    }
}
