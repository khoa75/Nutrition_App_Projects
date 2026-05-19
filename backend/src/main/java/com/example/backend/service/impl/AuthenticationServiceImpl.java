package com.example.backend.service.impl;

import com.example.backend.dto.request.LoginRequest;
import com.example.backend.dto.request.LogoutRequest;
import com.example.backend.dto.request.RegisterRequest;
import com.example.backend.dto.request.ResetPasswordRequest;
import com.example.backend.dto.response.AuthTokenResponse;
import com.example.backend.dto.response.RegisterResponse;
import com.example.backend.entity.Users;
import com.example.backend.enums.ErrorCode;
import com.example.backend.enums.UserStatus;
import com.example.backend.exception.AppException;
import com.example.backend.repository.UsersRepository;
import com.example.backend.service.AuthenticationService;
import com.example.backend.service.TokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Objects;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationServiceImpl.class);
    private static final int MAX_FAILED_ATTEMPTS = 5;
    private static final long LOCK_MINUTES = 15;

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AuthenticationServiceImpl(UsersRepository usersRepository,
                                     PasswordEncoder passwordEncoder,
                                     TokenService tokenService) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    @Override
    @Transactional
    public RegisterResponse register(RegisterRequest request) {
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            throw new AppException(ErrorCode.INVALID_PASSWORD_STRENGTH);
        }

        if (hasText(request.getEmail()) && usersRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
        }

        if (hasText(request.getPhone()) && usersRepository.existsByPhone(request.getPhone())) {
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
        }

        if (hasText(request.getSocialProvider()) && hasText(request.getSocialId())
                && usersRepository.existsBySocialProviderAndSocialId(request.getSocialProvider(), request.getSocialId())) {
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
        }

        Users user = Users.builder()
                .name(hasText(request.getName()) ? request.getName() : "User")
                .email(normalizeText(request.getEmail()))
                .phone(normalizeText(request.getPhone()))
                .socialProvider(normalizeText(request.getSocialProvider()))
                .socialId(normalizeText(request.getSocialId()))
                .hashPassword(passwordEncoder.encode(request.getPassword()))
                .failedLoginAttempts(0)
                .status(UserStatus.ACTIVE)
                .build();

        Users saved = usersRepository.save(user);
        logger.info("Registered user id={} email={}", saved.getId(), saved.getEmail());

        return RegisterResponse.builder()
                .userId(saved.getId())
                .email(saved.getEmail())
                .phone(saved.getPhone())
                .socialProvider(saved.getSocialProvider())
                .message("Register successfully")
                .build();
    }

    @Override
    @Transactional
    public AuthTokenResponse login(LoginRequest request) {
        Users user = usersRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        checkLockState(user);

        if (!passwordEncoder.matches(request.getPassword(), user.getHashPassword())) {
            increaseFailedAttempt(user);
            usersRepository.save(user);
            throw new AppException(ErrorCode.INVALID_CREDENTIALS);
        }

        user.setFailedLoginAttempts(0);
        user.setLockUntil(null);

        Instant accessExpiry = tokenService.computeAccessTokenExpiry();
        Instant refreshExpiry = tokenService.computeRefreshTokenExpiry(request.isRememberMe());
        String accessToken = tokenService.generateToken(user.getEmail(), accessExpiry);
        String refreshToken = tokenService.generateRefreshToken();

        user.setRefreshToken(refreshToken);
        user.setRefreshTokenExpiry(refreshExpiry);
        usersRepository.save(user);

        return AuthTokenResponse.builder()
                .jwtToken(accessToken)
                .refreshToken(refreshToken)
                .accessTokenExpiresInSeconds(accessExpiry.getEpochSecond() - Instant.now().getEpochSecond())
                .refreshTokenExpiresInSeconds(refreshExpiry.getEpochSecond() - Instant.now().getEpochSecond())
                .tokenType("Bearer")
                .build();
    }

    @Override
    @Transactional
    public void logout(LogoutRequest request) {
        Users user = usersRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        user.setRefreshToken(null);
        user.setRefreshTokenExpiry(null);
        usersRepository.save(user);
    }

    @Override
    public void resetPassword(ResetPasswordRequest request) {
        Users user = usersRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        logger.info("Generated password reset OTP for user id={} email={}", user.getId(), user.getEmail());
    }

    private void checkLockState(Users user) {
        if (Objects.equals(user.getStatus(), UserStatus.LOCK)
                && user.getLockUntil() != null
                && user.getLockUntil().isAfter(Instant.now())) {
            throw new AppException(ErrorCode.ACCOUNT_LOCKED);
        }
        if (user.getLockUntil() != null && user.getLockUntil().isBefore(Instant.now())) {
            user.setStatus(UserStatus.ACTIVE);
            user.setFailedLoginAttempts(0);
            user.setLockUntil(null);
        }
    }

    private void increaseFailedAttempt(Users user) {
        int failed = user.getFailedLoginAttempts() == null ? 0 : user.getFailedLoginAttempts();
        failed++;
        user.setFailedLoginAttempts(failed);
        if (failed >= MAX_FAILED_ATTEMPTS) {
            user.setStatus(UserStatus.LOCK);
            user.setLockUntil(Instant.now().plusSeconds(LOCK_MINUTES * 60));
            logger.warn("User id={} locked due to failed attempts", user.getId());
        }
    }

    private boolean hasText(String value) {
        return value != null && !value.trim().isEmpty();
    }

    private String normalizeText(String value) {
        return hasText(value) ? value.trim() : null;
    }
}
