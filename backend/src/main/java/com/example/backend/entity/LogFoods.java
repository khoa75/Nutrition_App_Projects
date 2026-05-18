package com.example.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;

/**
 * $table.getTableComment()
 */
@Entity
@Getter
@Setter
@ToString
@SuperBuilder
@NoArgsConstructor
@Table(name = "log_foods")
public class LogFoods implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "log_id", nullable = false)
    private Long logId;

    @Id
    @Column(name = "food_id", nullable = false)
    private Long foodId;

}
