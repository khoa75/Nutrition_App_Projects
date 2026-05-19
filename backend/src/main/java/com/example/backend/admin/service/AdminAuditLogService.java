package com.example.backend.admin.service;

import com.example.backend.admin.dto.response.AuditLogItemResponse;
import org.springframework.data.domain.Page;

public interface AdminAuditLogService {
    Page<AuditLogItemResponse> getAuditLogs(int page, int size);
}
