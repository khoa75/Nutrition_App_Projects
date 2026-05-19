package com.example.backend.controller;

import com.example.backend.dto.request.LoginRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.AuthTokenResponse;
import com.example.backend.service.AuthenticationService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class AuthenticateControllerUnitTest {

    @Test
    void login_ShouldWrapInApiResponse() {
        AuthenticationService authService = Mockito.mock(AuthenticationService.class);
        AuthenticateController controller = new AuthenticateController(authService);

        AuthTokenResponse tokenResponse = AuthTokenResponse.builder()
                .jwtToken("access-token")
                .refreshToken("refresh-token")
                .tokenType("Bearer")
                .accessTokenExpiresInSeconds(3600L)
                .refreshTokenExpiresInSeconds(7200L)
                .build();

        when(authService.login(any(LoginRequest.class))).thenReturn(tokenResponse);

        LoginRequest request = new LoginRequest();
        request.setEmail("test@example.com");
        request.setPassword("Password@123");

        ApiResponse<AuthTokenResponse> response = controller.login(request);

        assertTrue(response.isSuccess());
        assertEquals("Login successfully", response.getMessage());
        assertEquals("access-token", response.getData().getJwtToken());
    }
}
