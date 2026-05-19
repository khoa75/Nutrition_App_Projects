package com.example.backend.service;

import com.example.backend.dto.request.LoginRequest;
import com.example.backend.dto.request.LogoutRequest;
import com.example.backend.dto.request.RegisterRequest;
import com.example.backend.dto.request.ResetPasswordRequest;
import com.example.backend.dto.response.AuthTokenResponse;
import com.example.backend.entity.Users;
import com.example.backend.enums.ErrorCode;
import com.example.backend.enums.UserStatus;
import com.example.backend.exception.AppException;
import com.example.backend.repository.UsersRepository;
import com.example.backend.service.impl.AuthenticationServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceImplTest {

    @Mock
    private UsersRepository usersRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private TokenService tokenService;

    @InjectMocks
    private AuthenticationServiceImpl authenticationService;

    private RegisterRequest registerRequest;

    @BeforeEach
    void setUp() {
        registerRequest = new RegisterRequest();
        registerRequest.setEmail("test@example.com");
        registerRequest.setPassword("Password@123");
        registerRequest.setName("Tester");
    }

    @Test
    void register_ShouldSaveUser_WhenValidRequest() {
        when(usersRepository.existsByEmail("test@example.com")).thenReturn(false);
        when(passwordEncoder.encode("Password@123")).thenReturn("encoded-pass");
        when(usersRepository.save(any(Users.class))).thenAnswer(invocation -> {
            Users user = invocation.getArgument(0);
            user.setId(1L);
            return user;
        });

        var response = authenticationService.register(registerRequest);

        assertEquals(1L, response.getUserId());
        assertEquals("test@example.com", response.getEmail());
        verify(usersRepository, times(1)).save(any(Users.class));
    }

    @Test
    void register_ShouldThrow_WhenEmailExists() {
        when(usersRepository.existsByEmail("test@example.com")).thenReturn(true);

        AppException ex = assertThrows(AppException.class, () -> authenticationService.register(registerRequest));

        assertEquals(ErrorCode.USER_ALREADY_EXISTS, ex.getErrorCode());
        verify(usersRepository, never()).save(any());
    }

    @Test
    void login_ShouldReturnTokens_WhenCredentialsValid() {
        LoginRequest request = new LoginRequest();
        request.setEmail("test@example.com");
        request.setPassword("Password@123");
        request.setRememberMe(true);

        Users user = Users.builder().id(1L).email("test@example.com").hashPassword("encoded").status(UserStatus.ACTIVE).failedLoginAttempts(0).build();
        when(usersRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("Password@123", "encoded")).thenReturn(true);
        when(tokenService.computeAccessTokenExpiry()).thenReturn(Instant.now().plusSeconds(3600));
        when(tokenService.computeRefreshTokenExpiry(true)).thenReturn(Instant.now().plusSeconds(7200));
        when(tokenService.generateToken(any(), any())).thenReturn("access-token");
        when(tokenService.generateRefreshToken()).thenReturn("refresh-token");

        AuthTokenResponse response = authenticationService.login(request);

        assertEquals("access-token", response.getJwtToken());
        assertEquals("refresh-token", response.getRefreshToken());
        verify(usersRepository).save(user);
    }

    @Test
    void login_ShouldLockAccount_WhenFailedAttemptsReached() {
        LoginRequest request = new LoginRequest();
        request.setEmail("test@example.com");
        request.setPassword("wrong");

        Users user = Users.builder().id(1L).email("test@example.com").hashPassword("encoded").status(UserStatus.ACTIVE).failedLoginAttempts(4).build();
        when(usersRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrong", "encoded")).thenReturn(false);

        AppException ex = assertThrows(AppException.class, () -> authenticationService.login(request));

        assertEquals(ErrorCode.INVALID_CREDENTIALS, ex.getErrorCode());
        assertEquals(UserStatus.LOCK, user.getStatus());
        assertNotNull(user.getLockUntil());
    }

    @Test
    void logout_ShouldClearRefreshToken() {
        LogoutRequest request = new LogoutRequest();
        request.setEmail("test@example.com");

        Users user = Users.builder().id(1L).email("test@example.com").refreshToken("rt").build();
        when(usersRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        authenticationService.logout(request);

        assertNull(user.getRefreshToken());
        assertNull(user.getRefreshTokenExpiry());
        verify(usersRepository).save(user);
    }

    @Test
    void resetPassword_ShouldThrow_WhenUserNotFound() {
        ResetPasswordRequest request = new ResetPasswordRequest();
        request.setEmail("notfound@example.com");
        when(usersRepository.findByEmail("notfound@example.com")).thenReturn(Optional.empty());

        AppException ex = assertThrows(AppException.class, () -> authenticationService.resetPassword(request));

        assertEquals(ErrorCode.USER_NOT_FOUND, ex.getErrorCode());
    }
}
