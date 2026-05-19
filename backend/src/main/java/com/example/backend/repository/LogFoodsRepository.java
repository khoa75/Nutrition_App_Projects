package com.example.backend.repository;

import com.example.backend.entity.LogFoods;
import com.example.backend.entity.LogFoodsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface LogFoodsRepository extends JpaRepository<LogFoods, LogFoodsId>, JpaSpecificationExecutor<LogFoods> {

}
