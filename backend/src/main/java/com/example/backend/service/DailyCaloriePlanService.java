package com.example.backend.service;

import com.example.backend.entity.Users;

import java.time.LocalDate;

public interface DailyCaloriePlanService {
    void generatePlanForUser(Users user, LocalDate startDate, int totalDays);

    void syncAndAdjust(Long userId, LocalDate date);
}
