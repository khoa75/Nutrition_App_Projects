package com.example.backend.admin.controller;

import com.example.backend.admin.dto.response.AuditLogItemResponse;
import com.example.backend.admin.service.AdminAuditLogService;
import com.example.backend.dto.response.ApiResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/audit-logs")
public class AdminAuditLogController {

    private final AdminAuditLogService adminAuditLogService;

    public AdminAuditLogController(AdminAuditLogService adminAuditLogService) {
        this.adminAuditLogService = adminAuditLogService;
    }

    @GetMapping
    public ApiResponse<Page<AuditLogItemResponse>> getAuditLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ApiResponse.<Page<AuditLogItemResponse>>builder()
                .message("Get audit logs successfully")
                .data(adminAuditLogService.getAuditLogs(page, size))
                .build();
    }
}
