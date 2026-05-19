package com.example.backend.admin.service;

import com.example.backend.admin.entity.AuditLog;
import com.example.backend.admin.repository.AuditLogRepository;
import com.example.backend.admin.service.impl.AdminAuditLogServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.Instant;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AdminAuditLogServiceImplTest {

    @Mock
    private AuditLogRepository auditLogRepository;

    @InjectMocks
    private AdminAuditLogServiceImpl adminAuditLogService;

    @Test
    void getAuditLogs_ShouldReturnPagedAuditLogsOrderedByCreatedAtDesc() {
        AuditLog log = new AuditLog();
        log.setId(1L);
        log.setActorEmail("admin@nutrition.local");
        log.setTargetUserId(5L);
        log.setAction("LOCK");
        log.setDescription("Admin changed user status");
        log.setIpAddress("127.0.0.1");
        log.setCreatedAt(Instant.now());

        when(auditLogRepository.findAllByOrderByCreatedAtDesc(any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(log), PageRequest.of(0, 10), 1));

        var page = adminAuditLogService.getAuditLogs(0, 10);

        assertEquals(1, page.getTotalElements());
        assertEquals("LOCK", page.getContent().getFirst().getAction());
        assertEquals("127.0.0.1", page.getContent().getFirst().getIpAddress());
    }
}
