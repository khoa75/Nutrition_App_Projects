package com.example.backend.repository;

import com.example.backend.entity.Foods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface FoodsRepository extends JpaRepository<Foods, Long>, JpaSpecificationExecutor<Foods> {

}