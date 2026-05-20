import React, { useState, useMemo } from 'react';
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
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../types/navigation';
import { Colors } from '../../theme/colors';
import { useAuthStore } from '../../store/authStore';
import type { RegisterResponseData } from '../../types/api';

type RegisterProfileScreenRouteProp = RouteProp<AuthStackParamList, 'RegisterProfile'>;
type RegisterProfileScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'RegisterProfile'>;

interface Props {
  route: RegisterProfileScreenRouteProp;
  navigation: RegisterProfileScreenNavigationProp;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const RegisterProfileScreen: React.FC<Props> = ({ route, navigation }) => {
  const { registrationData } = route.params;
  const { register, login } = useAuthStore();

  // Core profile fields for registration
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | 'OTHER'>('MALE');
  const [dob, setDob] = useState<string | null>(null); // YYYY-MM-DD
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [goalType, setGoalType] = useState<'LOSE' | 'MAINTAIN' | 'GAIN'>('LOSE');
  const [kgPerWeek, setKgPerWeek] = useState(0.5);
  const [activityLevel, setActivityLevel] = useState<'SEDENTARY' | 'LIGHT_ACTIVE' | 'ACTIVE' | 'VERY_ACTIVE'>('ACTIVE');

  // Registration response data to display back
  const [responseData, setResponseData] = useState<RegisterResponseData | null>(null);

  // App UI states
  const [submitting, setSubmitting] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  // Date picker states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDay, setTempDay] = useState(20);
  const [tempMonth, setTempMonth] = useState(4); // May (0-indexed: 4)
  const [tempYear, setTempYear] = useState(2000);

  // Format DOB string for UI display
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

  // Compute live BMI
  const liveBmi = useMemo(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const heightInMeters = h / 100;
      return parseFloat((w / (heightInMeters * heightInMeters)).toFixed(1));
    }
    return null;
  }, [height, weight]);

  const liveBmiStatus = useMemo(() => {
    if (!liveBmi) return 'NORMAL';
    if (liveBmi < 18.5) return 'UNDERWEIGHT';
    if (liveBmi < 25) return 'NORMAL';
    if (liveBmi < 30) return 'OVERWEIGHT';
    return 'OBESE';
  }, [liveBmi]);

  // Confirm date picker selection
  const handleConfirmDate = () => {
    const formattedMonth = String(tempMonth + 1).padStart(2, '0');
    const formattedDay = String(tempDay).padStart(2, '0');
    setDob(`${tempYear}-${formattedMonth}-${formattedDay}`);
    setShowDatePicker(false);
  };

  // Submit combined registration form
  const handleSubmit = async () => {
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
        ...registrationData,
        phone: '', // Phone is removed from UI but might be required by backend DTO
        dob,
        gender,
        currentWeight: w,
        targetWeight: tw,
        height: h,
        activityLevel,
        goalType,
        kgPerWeek,
      };

      // Call register API
      const response = await register(payload);

      // Save response data to render in the form/modal
      setResponseData(response);

      // Show success modal
      setSuccessVisible(true);
    } catch (error: any) {
      console.log('Registration error:', error);
      const message = error.response?.data?.message || error.message || 'An error occurred during registration.';
      Alert.alert('Registration Failed', message);
    } finally {
      setSubmitting(false);
    }
  };

  // Go to Dashboard: Log in in the background and transition
  const handleGoToDashboard = async () => {
    setSuccessVisible(false);
    setSubmitting(true);
    try {
      await login({
        email: registrationData.email,
        password: registrationData.password,
      });
    } catch (error: any) {
      console.log('Background login error:', error);
      Alert.alert('Login Failed', 'Account registered but login failed. Please log in manually.');
      navigation.navigate('Login');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.statusBarIndicator} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complete Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* SECTION 1: Bio Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personal Details</Text>

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
                placeholder="175"
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
                placeholder="70"
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
          <Text style={styles.cardTitle}>Goal Strategy</Text>

          <Text style={styles.fieldLabel}>TARGET WEIGHT (KG)</Text>
          <TextInput
            style={styles.textInput}
            value={targetWeight}
            onChangeText={setTargetWeight}
            keyboardType="numeric"
            placeholder="65"
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

        {/* Render Response Data Back inside the Form if Registration Succeeds */}
        {responseData && (
          <View style={styles.caloriesBanner}>
            <Text style={styles.caloriesBannerLabel}>Calculation Results from Server</Text>
            <View style={styles.caloriesResultsRow}>
              <View style={styles.calItem}>
                <Text style={styles.calVal}>{responseData.goalCaloriesDaily} kcal</Text>
                <Text style={styles.calLabel}>Daily Goal</Text>
              </View>
              <View style={styles.calItem}>
                <Text style={styles.calVal}>{responseData.goalCaloriesWeekly} kcal</Text>
                <Text style={styles.calLabel}>Weekly Goal</Text>
              </View>
            </View>
            <Text style={styles.responseBannerMessage}>{responseData.message}</Text>
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>

      {/* Submit Button */}
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
            <Text style={styles.submitButtonText}>Submit Registration</Text>
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

      {/* Success Modal Overlay */}
      <Modal visible={successVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successModalCard}>
            <View style={styles.successIconWrapper}>
              <Ionicons name="checkmark-circle" size={64} color={Colors.success} />
            </View>
            <Text style={styles.successTitle}>Registration Complete!</Text>
            <Text style={styles.successSubtitle}>
              Your account has been registered successfully.
            </Text>

            {/* {responseData && (
              <View style={styles.successCaloriesBox}>
                <Text style={styles.successCaloriesText}>Daily Target Calories</Text>
                <Text style={styles.successCaloriesNum}>{responseData.goalCaloriesDaily} kcal</Text>
              </View>
            )} */}

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
    backgroundColor: '#F7F8F9',
  },
  statusBarIndicator: {
    height: 4,
    backgroundColor: Colors.primary,
  },
  header: {
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
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
    marginBottom: 10,
  },
  caloriesResultsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  calItem: {
    alignItems: 'center',
  },
  calVal: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
  },
  calLabel: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
  },
  responseBannerMessage: {
    fontSize: 13,
    color: '#34D399',
    fontWeight: '600',
    marginTop: 4,
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

export default RegisterProfileScreen;
