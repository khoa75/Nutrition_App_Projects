package com.example.backend.repository;

import com.example.backend.entity.Logs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface LogsRepository extends JpaRepository<Logs, Long>, JpaSpecificationExecutor<Logs> {
    @Query("SELECT l FROM Logs l WHERE l.user.id = :userId AND l.loggedAt BETWEEN :start AND :end")
    List<Logs> findByUserIdAndLoggedAtBetween(
            @Param("userId") Long userId,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );
}