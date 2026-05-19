package com.example.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApiResponse<T> {
    @Builder.Default
    boolean success = true;
    String message;
    T data;
    @Builder.Default
    Instant timestamp = Instant.now();
}
