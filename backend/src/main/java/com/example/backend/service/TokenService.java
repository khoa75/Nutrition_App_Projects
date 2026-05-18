package com.example.backend.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.Base64;

@Service
public class TokenService {

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    private final String signerKey;

    public TokenService(@Value("${jwt.signerKey}") String signerKey) {
        this.signerKey = signerKey;
    }

    public String generateToken(String subject, Instant expiry) {
        Key key = Keys.hmacShaKeyFor(signerKey.getBytes());
        return Jwts.builder()
                .subject(subject)
                .issuedAt(new Date())
                .expiration(Date.from(expiry))
                .signWith(key)
                .compact();
    }

    public String generateRefreshToken() {
        byte[] randomBytes = new byte[32];
        SECURE_RANDOM.nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }

    public Instant computeAccessTokenExpiry() {
        return Instant.now().plusSeconds(3600);
    }

    public Instant computeRefreshTokenExpiry(boolean rememberMe) {
        return rememberMe ? Instant.now().plusSeconds(60L * 60 * 24 * 30) : Instant.now().plusSeconds(60L * 60 * 24 * 7);
    }
}
