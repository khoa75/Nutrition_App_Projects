package com.example.backend.repository;

import com.example.backend.entity.UserWeightLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface UserWeightLogRepository extends JpaRepository<UserWeightLog, Long> {
    Optional<UserWeightLog> findByUserIdAndLogDate(Long userId, LocalDate logDate);
}
