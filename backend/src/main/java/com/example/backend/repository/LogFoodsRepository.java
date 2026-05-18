package com.example.backend.repository;

import com.example.backend.entity.LogFoods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface LogFoodsRepository extends JpaRepository<LogFoods, Long>, JpaSpecificationExecutor<LogFoods> {

}