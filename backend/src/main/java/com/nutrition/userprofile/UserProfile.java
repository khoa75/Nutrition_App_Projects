package com.nutrition.userprofile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user_profiles")
public class UserProfile {
    @Id
    private String id;

    @Field("user_id")
    private String userId;

    @Field("height_cm")
    private Double heightCm;

    @Field("weight_kg")
    private Double weightKg;

    @Field("activity_level")
    private String activityLevel; // e.g., "sedentary", "light", "moderate", "active"

    @Field("goal_type")
    private String goalType; // e.g., "maintain", "lose", "gain"

    @Field("target_weight_kg")
    private Double targetWeightKg;

    @Field("bmi")
    private Double bmi;

    @Field("bmr")
    private Double bmr;

    @Field("tdee")
    private Double tdee;

    @Field("created_at")
    private Instant createdAt;

    @Field("updated_at")
    private Instant updatedAt;
}
