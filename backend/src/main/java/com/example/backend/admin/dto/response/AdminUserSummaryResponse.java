package com.example.backend.admin.dto.response;

import com.example.backend.enums.UserStatus;
import com.example.backend.enums.WeightGoal;

public class AdminUserSummaryResponse {
    private Long id;
    private String name;
    private String email;
    private UserStatus status;
    private WeightGoal goalType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }

    public WeightGoal getGoalType() {
        return goalType;
    }

    public void setGoalType(WeightGoal goalType) {
        this.goalType = goalType;
    }
}
