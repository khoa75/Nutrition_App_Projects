package com.example.backend.repository;

import com.example.backend.entity.Logs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface LogsRepository extends JpaRepository<Logs, Long>, JpaSpecificationExecutor<Logs> {
    @Query("select coalesce(sum(l.totalCalories), 0) from Logs l where l.user.id = :userId and l.loggedAt >= :start and l.loggedAt < :end")
    BigDecimal sumTotalCaloriesByUserIdAndLoggedAtBetween(@Param("userId") Long userId,
                                                           @Param("start") LocalDateTime start,
                                                           @Param("end") LocalDateTime end);
}
