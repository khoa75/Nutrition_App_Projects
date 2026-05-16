package com.nutrition.userprofile.service.impl;

import com.nutrition.userprofile.HealthMetricsCalculator;
import com.nutrition.userprofile.UserProfile;
import com.nutrition.userprofile.dto.UserProfileRequest;
import com.nutrition.userprofile.dto.UserProfileResponse;
import com.nutrition.userprofile.repository.UserProfileRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserProfileServiceImplTest {
    @Mock
    private UserProfileRepository repo;

    @Mock
    private HealthMetricsCalculator calculator;

    @InjectMocks
    private UserProfileServiceImpl service;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getProfile_whenExists_returnsResponse() {
        UserProfile profile = new UserProfile("1", "user1", 170.0, 70.0, "moderate", "maintain", 75.0, 1600.0, 2500.0, null, null);
        when(repo.findByUserId("user1")).thenReturn(profile);

        UserProfileResponse resp = service.getProfile("user1");
        assertEquals("1", resp.id());
        assertEquals(70.0, resp.weightKg());
    }

    @Test
    void getProfile_whenNotExists_throwsException() {
        when(repo.findByUserId("unknown")).thenReturn(null);
        assertThrows(IllegalArgumentException.class, () -> service.getProfile("unknown"));
    }

    @Test
    void createOrUpdateProfile_createsNewProfile() {
        UserProfileRequest req = new UserProfileRequest(170.0, 70.0, "moderate", "maintain", 75.0);
        when(repo.findByUserId("user1")).thenReturn(null);
        when(calculator.calculateBMI(anyDouble(), anyDouble())).thenReturn(24.22);
        when(calculator.calculateBMR(anyDouble(), anyDouble(), anyInt(), anyString())).thenReturn(1600.0);
        when(calculator.calculateTDEE(anyDouble(), anyString())).thenReturn(2500.0);
        when(repo.save(any(UserProfile.class))).thenAnswer(inv -> inv.getArgument(0));

        UserProfileResponse resp = service.createOrUpdateProfile(req, "user1");
        assertEquals(170.0, resp.heightCm());
        assertEquals(70.0, resp.weightKg());
        assertEquals(24.22, resp.bmi(), 0.01);
        assertEquals(1600.0, resp.bmr(), 0.01);
        assertEquals(2500.0, resp.tdee(), 0.01);
    }
}
