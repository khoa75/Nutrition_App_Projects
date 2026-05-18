package com.example.backend.repository;

import com.example.backend.entity.Logs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface LogsRepository extends JpaRepository<Logs, Long>, JpaSpecificationExecutor<Logs> {

}