package com.nutrition.auth.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@Document(collection = "users")
public class User {
    @Id
    private String id;

    @Indexed(unique = true, sparse = true)
    private String email;

    @Indexed(unique = true, sparse = true)
    private String phone;

    private String passwordHash;

    private String fullName;

    @Builder.Default
    private String role = "USER";

    @Builder.Default
    private String status = "ACTIVE";

    @Builder.Default
    private int failedAttempts = 0;

    private LocalDateTime lockedUntil;

    @Builder.Default
    private List<SocialProvider> socialProviders = new ArrayList<>();

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Data
    @Builder
    public static class SocialProvider {
        private String provider;
        private String socialId;
    }
}
