package com.example.backend.dto.response;

import com.example.backend.enums.UserStatus;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private UserStatus status;
}
