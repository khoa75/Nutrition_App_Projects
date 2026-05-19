package com.example.backend.admin.controller;

import com.example.backend.admin.dto.request.AdminUpdateUserStatusRequest;
import com.example.backend.admin.dto.response.AdminUserStatusUpdateResponse;
import com.example.backend.admin.dto.response.AdminUserSummaryResponse;
import com.example.backend.admin.service.AdminUserService;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.FoodResponse;
import com.example.backend.enums.UserStatus;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertNotNull;
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
    void getAllUsers_ShouldWrapApiResponse() {
        AdminUserService service = Mockito.mock(AdminUserService.class);
        AdminUserController controller = new AdminUserController(service);

        AdminUserSummaryResponse user = new AdminUserSummaryResponse();
        user.setId(1L);
        user.setEmail("u@test.com");
        when(service.getAllUsers()).thenReturn(List.of(user));

        ApiResponse<List<AdminUserSummaryResponse>> response = controller.getAllUsers();

        assertTrue(response.isSuccess());
        assertEquals("Get all users successfully", response.getMessage());
        assertEquals(1, response.getData().size());
    }

    @Test
    void getAllFoods_ShouldWrapApiResponse() {
        AdminUserService service = Mockito.mock(AdminUserService.class);
        AdminUserController controller = new AdminUserController(service);

        FoodResponse food = FoodResponse.builder().id(1L).name("Rice").build();
        when(service.getAllFoods()).thenReturn(List.of(food));

        ApiResponse<List<FoodResponse>> response = controller.getAllFoods();

        assertTrue(response.isSuccess());
        assertEquals("Get all foods successfully", response.getMessage());
        assertNotNull(response.getData());
        assertEquals(1, response.getData().size());
    }

    @Test
    void updateUserStatus_ShouldWrapApiResponse() {
        AdminUserService service = Mockito.mock(AdminUserService.class);
        AdminUserController controller = new AdminUserController(service);
        AdminUserStatusUpdateResponse data = new AdminUserStatusUpdateResponse();
        data.setUserId(1L);
        data.setStatus(UserStatus.LOCK);
        when(service.updateUserStatus(eq(1L), eq("LOCK"), eq("admin@nutrition.local"), eq("10.1.1.9"))).thenReturn(data);

        AdminUpdateUserStatusRequest request = new AdminUpdateUserStatusRequest();
        request.setAction("LOCK");
        var auth = new UsernamePasswordAuthenticationToken("admin@nutrition.local", null);

        MockHttpServletRequest httpServletRequest = new MockHttpServletRequest();
        httpServletRequest.addHeader("X-Forwarded-For", "10.1.1.9");

        ApiResponse<AdminUserStatusUpdateResponse> response = controller.updateUserStatus(1L, request, auth, httpServletRequest);

        assertTrue(response.isSuccess());
        assertEquals(UserStatus.LOCK, response.getData().getStatus());
    }
}
