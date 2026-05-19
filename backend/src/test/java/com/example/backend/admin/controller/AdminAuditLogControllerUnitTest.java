package com.example.backend.admin.controller;

import com.example.backend.admin.dto.response.AuditLogItemResponse;
import com.example.backend.admin.service.AdminAuditLogService;
import com.example.backend.dto.response.ApiResponse;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.time.Instant;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

class AdminAuditLogControllerUnitTest {

    @Test
    void getAuditLogs_ShouldWrapApiResponse() {
        AdminAuditLogService service = Mockito.mock(AdminAuditLogService.class);
        AdminAuditLogController controller = new AdminAuditLogController(service);

        AuditLogItemResponse item = AuditLogItemResponse.builder()
                .id(1L)
                .actorEmail("admin@nutrition.local")
                .targetUserId(10L)
                .action("LOCK")
                .description("Admin admin@nutrition.local changed userId=10 status to LOCK")
                .ipAddress("10.1.1.9")
                .createdAt(Instant.now())
                .build();

        when(service.getAuditLogs(eq(0), eq(10))).thenReturn(new PageImpl<>(List.of(item)));

        ApiResponse<Page<AuditLogItemResponse>> response = controller.getAuditLogs(0, 10);

        assertTrue(response.isSuccess());
        assertEquals("Get audit logs successfully", response.getMessage());
        assertEquals(1, response.getData().getTotalElements());
        assertEquals("LOCK", response.getData().getContent().getFirst().getAction());
    }
}
