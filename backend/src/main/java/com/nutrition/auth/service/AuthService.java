package com.nutrition.auth.service;

import com.nutrition.auth.dto.LoginRequest;
import com.nutrition.auth.dto.RegisterRequest;
import com.nutrition.auth.dto.TokenResponse;

public interface AuthService {
    TokenResponse register(RegisterRequest request);
    TokenResponse login(LoginRequest request);
}
