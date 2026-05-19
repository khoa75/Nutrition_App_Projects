package com.example.backend.repository;

import com.example.backend.entity.DailyCaloriePlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DailyCaloriePlanRepository extends JpaRepository<DailyCaloriePlan, Long> {
    Optional<DailyCaloriePlan> findByUserIdAndPlanDate(Long userId, LocalDate planDate);

    List<DailyCaloriePlan> findByUserIdAndPlanDateBetweenOrderByPlanDateAsc(Long userId, LocalDate fromDate, LocalDate toDate);

    void deleteByUserIdAndPlanDateGreaterThanEqual(Long userId, LocalDate fromDate);
}
