package com.example.backend.admin.dto.request;

import jakarta.validation.constraints.NotBlank;

public class AdminUpdateUserStatusRequest {

    @NotBlank(message = "Action is required")
    private String action;

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }
}
