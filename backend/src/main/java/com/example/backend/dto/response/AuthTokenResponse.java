package com.example.backend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthTokenResponse {
    private String jwtToken;
    private String refreshToken;
    private Long accessTokenExpiresInSeconds;
    private Long refreshTokenExpiresInSeconds;
    private String tokenType;
}
