package com.example.backend.admin.service.impl;

import com.example.backend.admin.dto.response.AuditLogItemResponse;
import com.example.backend.admin.entity.AuditLog;
import com.example.backend.admin.repository.AuditLogRepository;
import com.example.backend.admin.service.AdminAuditLogService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminAuditLogServiceImpl implements AdminAuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AdminAuditLogServiceImpl(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AuditLogItemResponse> getAuditLogs(int page, int size) {
        Pageable pageable = PageRequest.of(Math.max(page, 0), Math.max(size, 1));
        Page<AuditLog> auditLogPage = auditLogRepository.findAllByOrderByCreatedAtDesc(pageable);

        List<AuditLogItemResponse> mapped = auditLogPage.getContent().stream()
                .map(this::toResponse)
                .toList();

        return new PageImpl<>(mapped, pageable, auditLogPage.getTotalElements());
    }

    private AuditLogItemResponse toResponse(AuditLog auditLog) {
        return AuditLogItemResponse.builder()
                .id(auditLog.getId())
                .actorEmail(auditLog.getActorEmail())
                .targetUserId(auditLog.getTargetUserId())
                .action(auditLog.getAction())
                .description(auditLog.getDescription())
                .ipAddress(auditLog.getIpAddress())
                .createdAt(auditLog.getCreatedAt())
                .build();
    }
}
