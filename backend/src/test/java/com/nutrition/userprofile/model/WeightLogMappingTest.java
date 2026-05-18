package com.nutrition.userprofile.model;

import org.junit.jupiter.api.Test;

import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class WeightLogMappingTest {

    @Test
    void shouldDeclareUniqueConstraintForUserAndDate() {
        Table table = WeightLog.class.getAnnotation(Table.class);

        assertEquals("user_weight_logs", table.name());
        UniqueConstraint[] constraints = table.uniqueConstraints();

        assertTrue(Arrays.stream(constraints)
                .anyMatch(constraint -> Arrays.equals(
                        constraint.columnNames(),
                        new String[]{"user_id", "log_date"}
                )));
    }
}
