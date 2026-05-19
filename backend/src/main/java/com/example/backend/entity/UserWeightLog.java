package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_weight_logs", uniqueConstraints = {
        @UniqueConstraint(name = "uk_user_weight_logs_user_id_log_date", columnNames = {"user_id", "log_date"})
}, indexes = {
        @Index(name = "idx_user_weight_logs_user_date", columnList = "user_id, log_date")
})
public class UserWeightLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(name = "log_date", nullable = false)
    private LocalDate logDate;

    @Column(name = "weight", nullable = false, precision = 5, scale = 2)
    private BigDecimal weight;
}
