package com.example.backend.admin.service;

import com.example.backend.admin.dto.response.AdminUserStatusUpdateResponse;
import com.example.backend.admin.dto.response.AdminUserSummaryResponse;
import com.example.backend.enums.UserStatus;
import com.example.backend.enums.WeightGoal;
import org.springframework.data.domain.Page;

public interface AdminUserService {
    Page<AdminUserSummaryResponse> getUsers(String search, UserStatus status, WeightGoal goal, int page, int size);

    AdminUserStatusUpdateResponse updateUserStatus(Long userId, String action, String actorEmail);
}
