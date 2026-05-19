package com.example.backend.admin.dto.response;

import com.example.backend.enums.UserStatus;

public class AdminUserStatusUpdateResponse {
    private Long userId;
    private UserStatus status;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }
}
