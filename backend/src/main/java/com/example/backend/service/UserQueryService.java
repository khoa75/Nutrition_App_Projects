package com.example.backend.service;

import com.example.backend.dto.response.UserResponse;
import com.example.backend.enums.UserStatus;

import java.util.List;

public interface UserQueryService {
    List<UserResponse> searchUsers(String email, UserStatus status);
}
