import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Colors } from '../theme/colors';
import { userService, type UserProfileData } from '../services/userService';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../types/navigation';

type ProfileScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'ProfileTab'>;

// Month mappings for conversion
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  // Core profile fields
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | 'OTHER'>('MALE');
  const [dob, setDob] = useState<string | null>(null); // YYYY-MM-DD
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [goalType, setGoalType] = useState<'LOSE' | 'MAINTAIN' | 'GAIN'>('LOSE');
  const [kgPerWeek, setKgPerWeek] = useState(0.5);
  const [activityLevel, setActivityLevel] = useState<'SEDENTARY' | 'LIGHT_ACTIVE' | 'ACTIVE' | 'VERY_ACTIVE'>('ACTIVE');

  // Stats from response
  const [serverBmi, setServerBmi] = useState<number | null>(null);
  const [serverBmiStatus, setServerBmiStatus] = useState<string | null>(null);
  const [serverGoalCalories, setServerGoalCalories] = useState<number | null>(null);

  // App UI states
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  // Date picker states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDay, setTempDay] = useState(12);
  const [tempMonth, setTempMonth] = useState(2); // March (0-indexed: Jan=0, Feb=1, Mar=2)
  const [tempYear, setTempYear] = useState(1994);

  // Fetch user profile on mount
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const profile = await userService.getUserProfile();
      populateForm(profile);
    } catch (error) {
      console.error('Fetch profile error:', error);
      Alert.alert('Error', 'Failed to load profile details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Helper to populate form fields from fetched API profile
  const populateForm = (profile: UserProfileData) => {
    setName(profile.name || '');
    setGender((profile.gender as 'MALE' | 'FEMALE' | 'OTHER') || 'MALE');
    setDob(profile.dob);
    setHeight(profile.height ? String(profile.height) : '');
    setWeight(profile.currentWeight ? String(profile.currentWeight) : '');
    setTargetWeight(profile.targetWeight ? String(profile.targetWeight) : '');
    setGoalType(profile.goalType || 'LOSE');
    setKgPerWeek(profile.kgPerWeek != null ? profile.kgPerWeek : 0.5);
    setActivityLevel(profile.activityLevel || 'ACTIVE');

    setServerBmi(profile.bmi || null);
    setServerBmiStatus(profile.bmiStatus || null);
    setServerGoalCalories(profile.goalCalories || null);

    // Populate local temp date picker fields
    if (profile.dob) {
      const parts = profile.dob.split('-');
      if (parts.length === 3) {
        setTempYear(parseInt(parts[0]));
        setTempMonth(parseInt(parts[1]) - 1);
        setTempDay(parseInt(parts[2]));
      }
    }
  };

  // Format DOB string for UI display (e.g. "March 12, 1994")
  const formattedDob = useMemo(() => {
    if (!dob) return 'Select birthdate';
    const parts = dob.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const monthIdx = parseInt(parts[1]) - 1;
      const day = parseInt(parts[2]);
      return `${MONTHS[monthIdx]} ${day}, ${year}`;
    }
    return dob;
  }, [dob]);

  // Compute local/live BMI to show responsive update before submission
  const liveBmi = useMemo(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const heightInMeters = h / 100;
      return parseFloat((w / (heightInMeters * heightInMeters)).toFixed(1));
    }
    return serverBmi;
  }, [height, weight, serverBmi]);

  const liveBmiStatus = useMemo(() => {
    if (!liveBmi) return serverBmiStatus || 'NORMAL';
    if (liveBmi < 18.5) return 'UNDERWEIGHT';
    if (liveBmi < 25) return 'NORMAL';
    if (liveBmi < 30) return 'OVERWEIGHT';
    return 'OBESE';
  }, [liveBmi, serverBmiStatus]);

  // Handle date confirm from picker modal
  const handleConfirmDate = () => {
    const formattedMonth = String(tempMonth + 1).padStart(2, '0');
    const formattedDay = String(tempDay).padStart(2, '0');
    setDob(`${tempYear}-${formattedMonth}-${formattedDay}`);
    setShowDatePicker(false);
  };

  // Submit Profile Form handler
  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Full Name is required.');
      return;
    }
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const tw = parseFloat(targetWeight);

    if (isNaN(h) || h <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid height.');
      return;
    }
    if (isNaN(w) || w <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid weight.');
      return;
    }
    if (isNaN(tw) || tw <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid target weight.');
      return;
    }
    if (!dob) {
      Alert.alert('Validation Error', 'Please select your birthdate.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        currentWeight: w,
        targetWeight: tw,
        height: h,
        gender,
        activityLevel,
        goalType,
        kgPerWeek,
      };

      // 1. Update goal calories on backend
      await userService.updateGoalCalories(payload);

      // 2. Fetch updated full profile immediately to sync
      const updatedProfile = await userService.getUserProfile();
      populateForm(updatedProfile);

      // 3. Show success banner
      setSuccessVisible(true);
    } catch (error) {
      console.error('Update profile error:', error);
      Alert.alert('Update Failed', 'An error occurred while saving your profile data.');
    } finally {
      setSubmitting(false);
    }
  };

  // Navigate to Home/Dashboard
  const handleGoToDashboard = () => {
    setSuccessVisible(false);
    navigation.navigate('DashboardTab');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading profile details...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Custom Header Bar */}
      <View style={styles.statusBarIndicator} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tell Us About Yourself</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* SECTION 1: Personal Information */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personal Information</Text>

          <Text style={styles.fieldLabel}>FULL NAME</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="John Doe"
            placeholderTextColor={Colors.textMuted}
          />

          <Text style={styles.fieldLabel}>GENDER</Text>
          <View style={styles.genderContainer}>
            {(['MALE', 'FEMALE', 'OTHER'] as const).map((g) => (
              <TouchableOpacity
                key={g}
                style={[
                  styles.genderOption,
                  gender === g && styles.genderOptionSelected,
                ]}
                activeOpacity={0.8}
                onPress={() => setGender(g)}
              >
                <Text
                  style={[
                    styles.genderText,
                    gender === g && styles.genderTextSelected,
                  ]}
                >
                  {g.charAt(0) + g.slice(1).toLowerCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.fieldLabel}>BIRTHDATE</Text>
          <TouchableOpacity
            style={styles.datePickerSelector}
            activeOpacity={0.8}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>{formattedDob}</Text>
            <Ionicons name="calendar-outline" size={22} color="#5F6D7E" />
          </TouchableOpacity>
        </View>

        {/* SECTION 2: Body Metrics */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Body Metrics</Text>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.fieldLabel}>HEIGHT (CM)</Text>
              <TextInput
                style={styles.metricInput}
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                placeholder="180"
                placeholderTextColor={Colors.textMuted}
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.fieldLabel}>WEIGHT (KG)</Text>
              <TextInput
                style={styles.metricInput}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                placeholder="72.5"
                placeholderTextColor={Colors.textMuted}
              />
            </View>
          </View>

          {/* BMI Info panel */}
          {liveBmi !== null && (
            <View style={styles.bmiContainer}>
              <View>
                <Text style={styles.bmiLabel}>BMI Score</Text>
                <Text style={styles.bmiValue}>{liveBmi}</Text>
              </View>
              <View style={styles.bmiStatusPill}>
                <Text style={styles.bmiStatusText}>{liveBmiStatus}</Text>
              </View>
            </View>
          )}
        </View>

        {/* SECTION 3: Select Goal Strategy */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Select Goal Strategy</Text>

          <Text style={styles.fieldLabel}>TARGET WEIGHT (KG)</Text>
          <TextInput
            style={styles.textInput}
            value={targetWeight}
            onChangeText={setTargetWeight}
            keyboardType="numeric"
            placeholder="70.0"
            placeholderTextColor={Colors.textMuted}
          />

          <View style={styles.goalStrategyContainer}>
            <TouchableOpacity
              style={[
                styles.goalOption,
                goalType === 'LOSE' && styles.goalOptionSelected,
              ]}
              activeOpacity={0.8}
              onPress={() => setGoalType('LOSE')}
            >
              <Ionicons
                name="trending-down"
                size={24}
                color={goalType === 'LOSE' ? Colors.primary : Colors.textSecondary}
              />
              <Text style={[styles.goalOptionText, goalType === 'LOSE' && styles.goalOptionTextSelected]}>
                Lose
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.goalOption,
                goalType === 'MAINTAIN' && styles.goalOptionSelected,
              ]}
              activeOpacity={0.8}
              onPress={() => setGoalType('MAINTAIN')}
            >
              <Ionicons
                name="scale-outline"
                size={24}
                color={goalType === 'MAINTAIN' ? Colors.primary : Colors.textSecondary}
              />
              <Text style={[styles.goalOptionText, goalType === 'MAINTAIN' && styles.goalOptionTextSelected]}>
                Maintain
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.goalOption,
                goalType === 'GAIN' && styles.goalOptionSelected,
              ]}
              activeOpacity={0.8}
              onPress={() => setGoalType('GAIN')}
            >
              <Ionicons
                name="trending-up"
                size={24}
                color={goalType === 'GAIN' ? Colors.primary : Colors.textSecondary}
              />
              <Text style={[styles.goalOptionText, goalType === 'GAIN' && styles.goalOptionTextSelected]}>
                Gain
              </Text>
            </TouchableOpacity>
          </View>

          {/* Target Rate Slider */}
          <View style={styles.sliderLabelRow}>
            <Text style={styles.sliderLabel}>TARGET RATE PER WEEK</Text>
            <Text style={styles.sliderValue}>{kgPerWeek.toFixed(1)} kg</Text>
          </View>

          <Slider
            style={styles.slider}
            minimumValue={0.0}
            maximumValue={1.0}
            step={0.1}
            value={kgPerWeek}
            onValueChange={setKgPerWeek}
            minimumTrackTintColor={Colors.primary}
            maximumTrackTintColor="#E2E8F0"
            thumbTintColor={Colors.primary}
          />
          <View style={styles.sliderRangeRow}>
            <Text style={styles.sliderRangeText}>0.0 kg</Text>
            <Text style={styles.sliderRangeText}>1.0 kg</Text>
          </View>
        </View>

        {/* SECTION 4: Daily Activity Level */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Activity Level</Text>

          <View style={styles.activityGrid}>
            {(['SEDENTARY', 'LIGHT_ACTIVE', 'ACTIVE', 'VERY_ACTIVE'] as const).map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.activityButton,
                  activityLevel === level && styles.activityButtonSelected,
                ]}
                activeOpacity={0.8}
                onPress={() => setActivityLevel(level)}
              >
                <Text
                  style={[
                    styles.activityButtonText,
                    activityLevel === level && styles.activityButtonTextSelected,
                  ]}
                >
                  {level.replace('_', ' ')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Display Calories if successfully saved */}
        {serverGoalCalories !== null && (
          <View style={styles.caloriesBanner}>
            <Text style={styles.caloriesBannerLabel}>Daily Target Calories</Text>
            <Text style={styles.caloriesBannerVal}>{serverGoalCalories} kcal</Text>
          </View>
        )}

        {/* Spacer */}
        <View style={{ height: 32 }} />
      </ScrollView>

      {/* Persistent Submit Button */}
      <View style={styles.submitContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          activeOpacity={0.8}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.submitButtonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      <Modal visible={showDatePicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.pickerModalContainer}>
            <View style={styles.pickerHeader}>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Text style={styles.pickerHeaderBtn}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.pickerHeaderTitle}>Select Birthdate</Text>
              <TouchableOpacity onPress={handleConfirmDate}>
                <Text style={[styles.pickerHeaderBtn, { color: Colors.primary, fontWeight: '700' }]}>Done</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.pickerSelectorsRow}>
              {/* Day Input Selector */}
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerColumnLabel}>Day</Text>
                <TextInput
                  style={styles.pickerValueInput}
                  keyboardType="numeric"
                  value={String(tempDay)}
                  onChangeText={(val) => {
                    const parsed = parseInt(val);
                    if (!isNaN(parsed) && parsed >= 1 && parsed <= 31) setTempDay(parsed);
                  }}
                />
              </View>

              {/* Month Selector */}
              <View style={[styles.pickerColumn, { flex: 2 }]}>
                <Text style={styles.pickerColumnLabel}>Month</Text>
                <ScrollView style={styles.pickerMonthScroll} nestedScrollEnabled>
                  {MONTHS.map((m, idx) => (
                    <TouchableOpacity
                      key={m}
                      style={[styles.monthRow, tempMonth === idx && styles.monthRowSelected]}
                      onPress={() => setTempMonth(idx)}
                    >
                      <Text style={[styles.monthRowText, tempMonth === idx && styles.monthRowTextSelected]}>
                        {m}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Year Input Selector */}
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerColumnLabel}>Year</Text>
                <TextInput
                  style={styles.pickerValueInput}
                  keyboardType="numeric"
                  value={String(tempYear)}
                  onChangeText={(val) => {
                    const parsed = parseInt(val);
                    if (!isNaN(parsed) && parsed >= 1900 && parsed <= 2100) setTempYear(parsed);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Success Overlay Modal */}
      <Modal visible={successVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successModalCard}>
            <View style={styles.successIconWrapper}>
              <Ionicons name="checkmark-circle" size={64} color={Colors.success} />
            </View>
            <Text style={styles.successTitle}>Profile Setup Complete!</Text>
            <Text style={styles.successSubtitle}>
              Your goal strategy and daily calorie requirements have been calculated.
            </Text>

            {serverGoalCalories && (
              <View style={styles.successCaloriesBox}>
                <Text style={styles.successCaloriesText}>Daily Target Calories</Text>
                <Text style={styles.successCaloriesNum}>{serverGoalCalories} kcal</Text>
              </View>
            )}

            <TouchableOpacity style={styles.successBtn} activeOpacity={0.8} onPress={handleGoToDashboard}>
              <Text style={styles.successBtnText}>Go to Dashboard</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F8F9', // light gray background from mockup
  },
  statusBarIndicator: {
    height: 4,
    backgroundColor: Colors.primary, // Teal indicator at very top
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F8F9',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  header: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Leave room for floating submit button
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#0F172A',
    marginBottom: 20,
  },
  genderContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  genderOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  genderOptionSelected: {
    backgroundColor: Colors.primary,
  },
  genderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  genderTextSelected: {
    color: '#FFF',
  },
  datePickerSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
  },
  dateText: {
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 0.48,
  },
  metricInput: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#0F172A',
    marginBottom: 16,
  },
  bmiContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bmiLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 4,
  },
  bmiValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  bmiStatusPill: {
    backgroundColor: '#E0F7F5',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  bmiStatusText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  goalStrategyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  goalOption: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingVertical: 16,
    backgroundColor: '#FFF',
  },
  goalOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#E0F7F5',
  },
  goalOptionText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  goalOptionTextSelected: {
    color: Colors.primary,
    fontWeight: '700',
  },
  sliderLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sliderLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 0.8,
  },
  sliderValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderRangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -4,
  },
  sliderRangeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
  },
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityButton: {
    width: '48%',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    backgroundColor: '#FFF',
  },
  activityButtonSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  activityButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  activityButtonTextSelected: {
    color: '#FFF',
  },
  caloriesBanner: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  caloriesBannerLabel: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
    marginBottom: 6,
  },
  caloriesBannerVal: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
  },
  submitContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    padding: 16,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end',
  },
  pickerModalContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  pickerHeaderBtn: {
    fontSize: 16,
    color: '#64748B',
  },
  pickerHeaderTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  pickerSelectorsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  pickerColumn: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  pickerColumnLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 8,
  },
  pickerValueInput: {
    width: '100%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
  },
  pickerMonthScroll: {
    height: 120,
    width: '100%',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
  },
  monthRow: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  monthRowSelected: {
    backgroundColor: '#E0F7F5',
  },
  monthRowText: {
    fontSize: 14,
    color: '#475569',
  },
  monthRowTextSelected: {
    color: Colors.primary,
    fontWeight: '700',
  },
  successModalCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 28,
    marginHorizontal: 24,
    marginBottom: 'auto',
    marginTop: 'auto',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  successIconWrapper: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 10,
  },
  successSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  successCaloriesBox: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    width: '100%',
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  successCaloriesText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 4,
  },
  successCaloriesNum: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primary,
  },
  successBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
  },
  successBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
});

export default ProfileScreen;