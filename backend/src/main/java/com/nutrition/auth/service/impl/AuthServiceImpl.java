package com.nutrition.auth.service.impl;

import com.nutrition.auth.dto.LoginRequest;
import com.nutrition.auth.dto.RegisterRequest;
import com.nutrition.auth.dto.TokenResponse;
import com.nutrition.auth.model.User;
import com.nutrition.auth.repository.UserRepository;
import com.nutrition.auth.service.AuthService;
import com.nutrition.common.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public TokenResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Email already registered");
        }

        var user = User.builder()
                .email(request.email())
                .passwordHash(passwordEncoder.encode(request.password()))
                .fullName(request.fullName())
                .role("USER")
                .status("ACTIVE")
                .build();

        userRepository.save(user);

        return buildTokenResponse(user);
    }

    @Override
    public TokenResponse login(LoginRequest request) {
        var user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new BadRequestException("Invalid credentials"));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new BadRequestException("Invalid credentials");
        }

        return buildTokenResponse(user);
    }

    private TokenResponse buildTokenResponse(User user) {
        var userInfo = new TokenResponse.UserInfo(
                user.getId(), user.getEmail(), user.getFullName(), user.getRole());
        // TODO: generate real JWT
        return new TokenResponse("mock-jwt-token", "mock-refresh-token", "Bearer", 86400L, userInfo);
    }
}
