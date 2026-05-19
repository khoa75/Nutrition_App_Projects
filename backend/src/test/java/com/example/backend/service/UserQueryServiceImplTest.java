package com.example.backend.service;

import com.example.backend.entity.Users;
import com.example.backend.enums.UserStatus;
import com.example.backend.repository.UsersRepository;
import com.example.backend.service.impl.UserQueryServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserQueryServiceImplTest {

    @Mock
    private UsersRepository usersRepository;

    @InjectMocks
    private UserQueryServiceImpl userQueryService;

    @Test
    void searchUsers_ShouldMapUsers() {
        Users user = Users.builder()
                .id(1L)
                .name("John")
                .email("john@example.com")
                .phone("0123456789")
                .status(UserStatus.ACTIVE)
                .build();

        when(usersRepository.findAll(ArgumentMatchers.<org.springframework.data.jpa.domain.Specification<Users>>any()))
                .thenReturn(List.of(user));

        var result = userQueryService.searchUsers("john", UserStatus.ACTIVE);

        assertEquals(1, result.size());
        assertEquals("john@example.com", result.get(0).getEmail());
        assertEquals(UserStatus.ACTIVE, result.get(0).getStatus());
        verify(usersRepository).findAll(ArgumentMatchers.<org.springframework.data.jpa.domain.Specification<Users>>any());
    }
}
