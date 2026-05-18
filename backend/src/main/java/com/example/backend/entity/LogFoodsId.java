package com.example.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class LogFoodsId {
    @Column(name = "log_id", nullable = false)
    private Long logId;

    @Column(name = "food_id", nullable = false)
    private Long foodId;
}
