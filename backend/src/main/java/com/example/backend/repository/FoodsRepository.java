package com.example.backend.repository;

import com.example.backend.entity.Foods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FoodsRepository extends JpaRepository<Foods, Long>, JpaSpecificationExecutor<Foods> {
    Page<Foods> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
