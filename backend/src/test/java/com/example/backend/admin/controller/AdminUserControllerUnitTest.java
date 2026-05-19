package com.example.backend.admin.controller;

import com.example.backend.admin.dto.request.AdminUpdateUserStatusRequest;
import com.example.backend.admin.dto.response.AdminUserStatusUpdateResponse;
import com.example.backend.admin.service.AdminUserService;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.enums.UserStatus;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

class AdminUserControllerUnitTest {

    @Test
    void getUsers_ShouldWrapApiResponse() {
        AdminUserService service = Mockito.mock(AdminUserService.class);
        AdminUserController controller = new AdminUserController(service);
        when(service.getUsers(any(), any(), any(), anyInt(), anyInt()))
                .thenReturn(new PageImpl<>(List.of()));

        ApiResponse<Page<com.example.backend.admin.dto.response.AdminUserSummaryResponse>> response =
                controller.getUsers(null, null, null, 0, 10);

        assertTrue(response.isSuccess());
        assertEquals("Get admin users successfully", response.getMessage());
        assertEquals(0, response.getData().getTotalElements());
    }

    @Test
    void updateUserStatus_ShouldWrapApiResponse() {
        AdminUserService service = Mockito.mock(AdminUserService.class);
        AdminUserController controller = new AdminUserController(service);
        AdminUserStatusUpdateResponse data = new AdminUserStatusUpdateResponse();
        data.setUserId(1L);
        data.setStatus(UserStatus.LOCK);
        when(service.updateUserStatus(eq(1L), eq("LOCK"), eq("admin@nutrition.local"))).thenReturn(data);

        AdminUpdateUserStatusRequest request = new AdminUpdateUserStatusRequest();
        request.setAction("LOCK");
        var auth = new UsernamePasswordAuthenticationToken("admin@nutrition.local", null);

        ApiResponse<AdminUserStatusUpdateResponse> response = controller.updateUserStatus(1L, request, auth);

        assertTrue(response.isSuccess());
        assertEquals(UserStatus.LOCK, response.getData().getStatus());
    }
}
