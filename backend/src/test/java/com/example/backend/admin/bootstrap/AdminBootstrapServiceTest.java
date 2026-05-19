package com.example.backend.admin.bootstrap;

import com.example.backend.admin.config.AdminBootstrapProperties;
import com.example.backend.entity.Users;
import com.example.backend.repository.UsersRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.lenient;

@ExtendWith(MockitoExtension.class)
class AdminBootstrapServiceTest {

    @Mock
    private UsersRepository usersRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private AdminBootstrapProperties properties;

    @InjectMocks
    private AdminBootstrapService adminBootstrapService;

    @BeforeEach
    void setUp() {
        lenient().when(properties.isEnabled()).thenReturn(true);
        lenient().when(properties.getEmail()).thenReturn("admin@nutrition.local");
        lenient().when(properties.getPassword()).thenReturn("Admin@123456");
        lenient().when(properties.getName()).thenReturn("System Admin");
    }

    @Test
    void bootstrapAdmin_ShouldCreateAccount_WhenAdminNotExists() {
        when(usersRepository.existsByEmail("admin@nutrition.local")).thenReturn(false);
        when(passwordEncoder.encode("Admin@123456")).thenReturn("encoded");

        adminBootstrapService.bootstrapAdmin();

        ArgumentCaptor<Users> userCaptor = ArgumentCaptor.forClass(Users.class);
        verify(usersRepository).save(userCaptor.capture());
        Users savedUser = userCaptor.getValue();
        assertEquals("admin@nutrition.local", savedUser.getEmail());
        assertEquals("encoded", savedUser.getHashPassword());
        assertTrue(savedUser.getFailedLoginAttempts() == 0);
    }

    @Test
    void bootstrapAdmin_ShouldSkip_WhenAdminAlreadyExists() {
        when(usersRepository.existsByEmail("admin@nutrition.local")).thenReturn(true);

        adminBootstrapService.bootstrapAdmin();

        verify(usersRepository, never()).save(any());
        verify(passwordEncoder, never()).encode(any());
    }
}
