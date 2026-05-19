package com.example.backend.service;

import com.example.backend.dto.request.LoginRequest;
import com.example.backend.dto.request.LogoutRequest;
import com.example.backend.dto.request.RegisterRequest;
import com.example.backend.dto.request.ResetPasswordRequest;
import com.example.backend.dto.response.AuthTokenResponse;
import com.example.backend.dto.response.RegisterResponse;

public interface AuthenticationService {
    RegisterResponse register(RegisterRequest request);

    AuthTokenResponse login(LoginRequest request);

    void logout(LogoutRequest request);

    void resetPassword(ResetPasswordRequest request);
}
