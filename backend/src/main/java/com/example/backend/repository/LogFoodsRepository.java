package com.example.backend.repository;

import com.example.backend.entity.LogFoods;
import com.example.backend.entity.LogFoodsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface LogFoodsRepository extends JpaRepository<LogFoods, LogFoodsId>, JpaSpecificationExecutor<LogFoods> {
    Optional<LogFoods> findFirstByLogs_Id(Long logsId);

    void deleteByLogs_Id(Long logsId);
}
