package com.example.backend.entity;

import jakarta.persistence.*;
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

    @EmbeddedId
    private LogFoodsId id;

    @MapsId("logId")
    @ManyToOne
    @JoinColumn(name = "log_id", nullable = false)
    private Logs logs;

    @MapsId("foodId")
    @ManyToOne
    @JoinColumn(name = "food_id", nullable = false)
    private Foods food;
}
