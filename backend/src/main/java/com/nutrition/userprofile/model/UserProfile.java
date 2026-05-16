package com.nutrition.userprofile.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@Document(collection = "user_profiles")
public class UserProfile {
    @Id
    private String id;

    @Indexed(unique = true)
    @Field("user_id")
    private String userId;

    private LocalDate dob;

    private String gender;

    @Field("height_cm")
    private double heightCm;

    @Field("weight_kg")
    private double weightKg;

    @Field("activity_level")
    private String activityLevel;

    @Field("goal_type")
    private String goalType;

    @Field("target_weight_kg")
    private Double targetWeightKg;

    private double bmi;

    private double bmr;

    private double tdee;

    @LastModifiedDate
    @Field("updated_at")
    private LocalDateTime updatedAt;
}
