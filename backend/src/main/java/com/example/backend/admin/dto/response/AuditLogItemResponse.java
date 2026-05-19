package com.example.backend.admin.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class AuditLogItemResponse {
    private Long id;
    private String actorEmail;
    private Long targetUserId;
    private String action;
    private String description;
    private String ipAddress;
    private Instant createdAt;
}
