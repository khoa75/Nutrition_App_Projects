package com.nutrition.userprofile.service.impl;

import com.nutrition.common.exception.ResourceNotFoundException;
import com.nutrition.userprofile.dto.HealthMetricsRequest;
import com.nutrition.userprofile.dto.HealthMetricsResponse;
import com.nutrition.userprofile.dto.ProfileUpdateRequest;
import com.nutrition.userprofile.model.UserProfile;
import com.nutrition.userprofile.repository.UserProfileRepository;
import com.nutrition.userprofile.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {

    private final UserProfileRepository profileRepository;

    private static final Map<String, Double> ACTIVITY_MULTIPLIERS = Map.of(
            "SEDENTARY", 1.2,
            "LIGHT", 1.375,
            "MODERATE", 1.55,
            "ACTIVE", 1.725,
            "VERY_ACTIVE", 1.9
    );

    @Override
    public HealthMetricsResponse calculateMetrics(HealthMetricsRequest request) {
        double bmi = request.weightKg() / Math.pow(request.heightCm() / 100, 2);
        double bmr = calculateBmr(request.weightKg(), request.heightCm(), request.age(), request.gender());
        double activityMultiplier = ACTIVITY_MULTIPLIERS.getOrDefault(request.activityLevel().toUpperCase(), 1.2);
        double tdee = bmr * activityMultiplier;

        String bmiCategory;
        if (bmi < 18.5) bmiCategory = "Underweight";
        else if (bmi < 25) bmiCategory = "Normal";
        else if (bmi < 30) bmiCategory = "Overweight";
        else bmiCategory = "Obese";

        return new HealthMetricsResponse(Math.round(bmi * 100.0) / 100.0,
                Math.round(bmr * 100.0) / 100.0,
                Math.round(tdee * 100.0) / 100.0,
                bmiCategory);
    }

    @Override
    public UserProfile getProfile(String userId) {
        return profileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("UserProfile", userId));
    }

    @Override
    public UserProfile updateProfile(String userId, ProfileUpdateRequest request) {
        UserProfile profile = profileRepository.findByUserId(userId)
                .orElseGet(() -> UserProfile.builder().userId(userId).build());

        if (request.dob() != null) profile.setDob(request.dob());
        if (request.gender() != null) profile.setGender(request.gender());
        if (request.heightCm() != null) profile.setHeightCm(request.heightCm());
        if (request.weightKg() != null) profile.setWeightKg(request.weightKg());
        if (request.activityLevel() != null) profile.setActivityLevel(request.activityLevel());
        if (request.goalType() != null) profile.setGoalType(request.goalType());
        if (request.targetWeightKg() != null) profile.setTargetWeightKg(request.targetWeightKg());

        // Recalculate BMI/BMR/TDEE
        if (request.heightCm() != null || request.weightKg() != null) {
            double h = request.heightCm() != null ? request.heightCm() : profile.getHeightCm();
            double w = request.weightKg() != null ? request.weightKg() : profile.getWeightKg();
            profile.setBmi(Math.round(w / Math.pow(h / 100, 2) * 100.0) / 100.0);
        }

        return profileRepository.save(profile);
    }

    private double calculateBmr(double weightKg, double heightCm, int age, String gender) {
        if ("MALE".equalsIgnoreCase(gender)) {
            return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
        }
        return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
}
