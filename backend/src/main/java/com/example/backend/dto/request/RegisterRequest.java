package com.example.backend.dto.request;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @Pattern(regexp = "^$|^[A-Za-z ]{2,100}$", message = "Name must contain only letters and spaces")
    private String name;

    @Pattern(regexp = "^$|^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$", message = "Invalid email format")
    private String email;

    @Pattern(regexp = "^$|^\\+?[0-9]{9,15}$", message = "Invalid phone format")
    private String phone;

    @Size(max = 50, message = "Social provider max length is 50")
    private String socialProvider;

    @Size(max = 255, message = "Social id max length is 255")
    private String socialId;

    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            message = "Password must be at least 8 chars with upper, lower, number and special char"
    )
    private String password;

    @AssertTrue(message = "One login method is required: email, phone, or social")
    public boolean isAtLeastOneIdentityPresent() {
        return hasText(email) || hasText(phone) || (hasText(socialProvider) && hasText(socialId));
    }

    private boolean hasText(String value) {
        return value != null && !value.trim().isEmpty();
    }
}
