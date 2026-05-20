package com.example.backend.admin.service;

import com.example.backend.admin.repository.AuditLogRepository;
import com.example.backend.admin.service.impl.AdminUserServiceImpl;
import com.example.backend.entity.Users;
import com.example.backend.enums.UserStatus;
import com.example.backend.repository.FoodsRepository;
import com.example.backend.repository.UsersRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdminUserServiceImplTest {

    @Mock
    private UsersRepository usersRepository;

    @Mock
    private FoodsRepository foodsRepository;

    @Mock
    private AuditLogRepository auditLogRepository;

    @InjectMocks
    private AdminUserServiceImpl adminUserService;

    @Test
    void updateUserStatus_ShouldLockUser_WhenActionIsLock() {
        Users user = Users.builder().id(10L).email("u1@test.com").status(UserStatus.ACTIVE).failedLoginAttempts(0).build();
        when(usersRepository.findById(10L)).thenReturn(Optional.of(user));

        var response = adminUserService.updateUserStatus(10L, "LOCK", "admin@nutrition.local", "127.0.0.1");

        assertEquals(UserStatus.LOCK, response.getStatus());
        verify(usersRepository).save(user);
        verify(auditLogRepository).save(any());
    }

    @Test
    void updateUserStatus_ShouldUnlockUser_WhenActionIsUnlock() {
        Users user = Users.builder().id(10L).email("u1@test.com").status(UserStatus.LOCK).failedLoginAttempts(3).build();
        when(usersRepository.findById(10L)).thenReturn(Optional.of(user));

        var response = adminUserService.updateUserStatus(10L, "UNLOCK", "admin@nutrition.local", "127.0.0.1");

        assertEquals(UserStatus.ACTIVE, response.getStatus());
        verify(usersRepository).save(user);
        verify(auditLogRepository).save(any());
    }

    @Test
    void updateUserStatus_ShouldThrow_WhenActionInvalid() {
        Users user = Users.builder().id(10L).email("u1@test.com").status(UserStatus.ACTIVE).build();
        when(usersRepository.findById(10L)).thenReturn(Optional.of(user));

        assertThrows(IllegalArgumentException.class,
                () -> adminUserService.updateUserStatus(10L, "INVALID", "admin@nutrition.local", "127.0.0.1"));
        verify(auditLogRepository, never()).save(any());
    }
}
