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

    @ManyToOne
    private Logs logs;
}
