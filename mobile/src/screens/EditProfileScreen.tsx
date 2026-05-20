import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { userService, type UserProfileData } from '../services/userService';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type EditProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditProfile'>;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const FULL_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const GENDER_OPTIONS = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
  { label: 'Other', value: 'OTHER' },
];

const ACTIVITY_OPTIONS = [
  { label: 'SEDENTARY', value: 'SEDENTARY' },
  { label: 'LIGHT ACTIVE', value: 'LIGHT_ACTIVE' },
  { label: 'ACTIVE', value: 'ACTIVE' },
  { label: 'VERY ACTIVE', value: 'VERY_ACTIVE' },
];

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<EditProfileNavigationProp>();

  // Profile data from backend
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form fields state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | 'OTHER'>('MALE');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [dob, setDob] = useState<string | null>(null); // YYYY-MM-DD
  const [activityLevel, setActivityLevel] = useState<'SEDENTARY' | 'LIGHT_ACTIVE' | 'ACTIVE' | 'VERY_ACTIVE'>('ACTIVE');

  // Selector modals state
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  // Temp date states
  const [tempDay, setTempDay] = useState(12);
  const [tempMonth, setTempMonth] = useState(9); // Oct (9)
  const [tempYear, setTempYear] = useState(1992);

  // Fetch initial profile
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await userService.getUserProfile();
      setProfile(data);

      setName(data.name || '');
      setEmail(data.email || '');
      setGender((data.gender as 'MALE' | 'FEMALE' | 'OTHER') || 'MALE');
      setHeight(data.height ? String(data.height) : '');
      setWeight(data.currentWeight ? String(data.currentWeight) : '');
      setTargetWeight(data.targetWeight ? String(data.targetWeight) : '');
      setDob(data.dob);
      setActivityLevel(data.activityLevel || 'ACTIVE');

      if (data.dob) {
        const parts = data.dob.split('-');
        if (parts.length === 3) {
          setTempYear(parseInt(parts[0]));
          setTempMonth(parseInt(parts[1]) - 1);
          setTempDay(parseInt(parts[2]));
        }
      }
    } catch (error) {
      console.log('Fetch profile error in EditProfileScreen:', error);
      // Suppress the alert for 403 or general fetch errors to avoid UI disruption
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Compute live BMI & Status
  const computedBmiData = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (isNaN(w) || isNaN(h) || h <= 0 || w <= 0) {
      return { bmi: '--', status: 'UNKNOWN', color: '#64748B', bg: '#F1F5F9' };
    }

    const heightInMeters = h / 100;
    const bmiVal = w / (heightInMeters * heightInMeters);
    const formattedBmi = bmiVal.toFixed(1);

    let status = 'NORMAL';
    let color = '#0D5C46';
    let bg = '#E0F7F5';

    if (bmiVal < 18.5) {
      status = 'UNDERWEIGHT';
      color = '#0284C7';
      bg = '#E0F2FE';
    } else if (bmiVal >= 25.0 && bmiVal < 30.0) {
      status = 'OVERWEIGHT';
      color = '#D97706';
      bg = '#FEF3C7';
    } else if (bmiVal >= 30.0) {
      status = 'OBESE';
      color = '#DC2626';
      bg = '#FEE2E2';
    }

    return { bmi: formattedBmi, status, color, bg };
  }, [weight, height]);

  // Formatted birthdate string for display
  const displayDob = useMemo(() => {
    if (!dob) return 'Select birthdate';
    const parts = dob.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const monthIdx = parseInt(parts[1]) - 1;
      const day = parseInt(parts[2]);
      return `${day} ${MONTHS[monthIdx]} ${year}`;
    }
    return dob;
  }, [dob]);

  const handleConfirmDate = () => {
    const formattedMonth = String(tempMonth + 1).padStart(2, '0');
    const formattedDay = String(tempDay).padStart(2, '0');
    setDob(`${tempYear}-${formattedMonth}-${formattedDay}`);
    setDatePickerVisible(false);
  };

  const handleSave = async () => {
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

    setSaving(true);
    try {
      const payload = {
        name: name.trim(),
        dob,
        gender,
        currentWeight: w,
        height: h,
        targetWeight: tw,
        activityLevel,
        // Carry over or set defaults
        goalType: profile?.goalType || 'LOSE',
        kgPerWeek: profile?.kgPerWeek != null ? profile.kgPerWeek : 0.5,
      };

      await userService.updateProfile(payload);
      Alert.alert('Success', 'Profile updated successfully.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      console.log('Update profile error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#14B8A6" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#0D5C46" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Personal Profile</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Full Name */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter full name"
          placeholderTextColor="#94A3B8"
        />

        {/* Email Address (Disabled with lock icon) */}
        <Text style={styles.label}>Email</Text>
        <View style={styles.disabledInputContainer}>
          <TextInput
            style={styles.disabledInput}
            value={email}
            editable={false}
            placeholder="example@email.com"
            placeholderTextColor="#94A3B8"
          />
          <Ionicons name="lock-closed-outline" size={20} color="#94A3B8" />
        </View>

        {/* Gender Dropdown */}
        <Text style={styles.label}>Gender</Text>
        <TouchableOpacity
          style={styles.dropdownSelector}
          activeOpacity={0.8}
          onPress={() => setGenderModalVisible(true)}
        >
          <Text style={styles.dropdownText}>
            {GENDER_OPTIONS.find((g) => g.value === gender)?.label || 'Select Gender'}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#64748B" />
        </TouchableOpacity>

        {/* Height and Weight Row */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Current Height (cm)</Text>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
              placeholder="170"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Current Weight (kg)</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              placeholder="70"
              placeholderTextColor="#94A3B8"
            />
          </View>
        </View>

        {/* BMI Score Card */}
        <View style={styles.bmiCard}>
          <View>
            <Text style={styles.bmiLabel}>BMI Score</Text>
            <Text style={styles.bmiValue}>{computedBmiData.bmi}</Text>
          </View>
          <View style={[styles.bmiBadge, { backgroundColor: computedBmiData.bg }]}>
            <Text style={[styles.bmiBadgeText, { color: computedBmiData.color }]}>
              {computedBmiData.status}
            </Text>
          </View>
        </View>

        {/* Target Weight */}
        <Text style={styles.label}>Target Weight (kg)</Text>
        <TextInput
          style={styles.input}
          value={targetWeight}
          onChangeText={setTargetWeight}
          keyboardType="numeric"
          placeholder="Enter target weight"
          placeholderTextColor="#94A3B8"
        />

        {/* Birthdate */}
        <Text style={styles.label}>Birthdate</Text>
        <TouchableOpacity
          style={styles.dropdownSelector}
          activeOpacity={0.8}
          onPress={() => setDatePickerVisible(true)}
        >
          <Text style={styles.dropdownText}>{displayDob}</Text>
          <Ionicons name="calendar-outline" size={20} color="#64748B" />
        </TouchableOpacity>

        {/* Current Activity Index Scale */}
        <Text style={styles.label}>Current Activity Index Scale</Text>
        <TouchableOpacity
          style={styles.dropdownSelector}
          activeOpacity={0.8}
          onPress={() => setActivityModalVisible(true)}
        >
          <Text style={styles.dropdownText}>
            {activityLevel.replace('_', ' ')}
          </Text>
          <Ionicons name="swap-vertical-outline" size={20} color="#64748B" />
        </TouchableOpacity>

        {/* Buttons Row */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.discardButton}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            disabled={saving}
          >
            <Text style={styles.discardButtonText}>Discard Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.8}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.saveButtonText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* --- GENDER SELECTOR MODAL --- */}
      <Modal visible={genderModalVisible} transparent animationType="fade">
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setGenderModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Gender</Text>
            {GENDER_OPTIONS.map((g) => (
              <TouchableOpacity
                key={g.value}
                style={[
                  styles.modalOption,
                  gender === g.value && styles.modalOptionSelected
                ]}
                onPress={() => {
                  setGender(g.value as any);
                  setGenderModalVisible(false);
                }}
              >
                <Text style={[styles.modalOptionText, gender === g.value && styles.modalOptionTextSelected]}>
                  {g.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* --- ACTIVITY LEVEL SELECTOR MODAL --- */}
      <Modal visible={activityModalVisible} transparent animationType="fade">
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setActivityModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Activity Level</Text>
            {ACTIVITY_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.modalOption,
                  activityLevel === opt.value && styles.modalOptionSelected
                ]}
                onPress={() => {
                  setActivityLevel(opt.value as any);
                  setActivityModalVisible(false);
                }}
              >
                <Text style={[styles.modalOptionText, activityLevel === opt.value && styles.modalOptionTextSelected]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* --- DATE PICKER MODAL --- */}
      <Modal visible={datePickerVisible} transparent animationType="slide">
        <View style={styles.datePickerOverlay}>
          <View style={styles.pickerModalContainer}>
            <View style={styles.pickerHeader}>
              <TouchableOpacity onPress={() => setDatePickerVisible(false)}>
                <Text style={styles.pickerHeaderBtn}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.pickerHeaderTitle}>Select Birthdate</Text>
              <TouchableOpacity onPress={handleConfirmDate}>
                <Text style={[styles.pickerHeaderBtn, { color: '#14B8A6', fontWeight: '700' }]}>Done</Text>
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
                  {FULL_MONTHS.map((m, idx) => (
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

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '600',
    color: '#64748B',
  },
  header: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerRightPlaceholder: {
    width: 32,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 8,
    marginTop: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#0F172A',
    backgroundColor: '#FFF',
  },
  disabledInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F1F5F9',
  },
  disabledInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: '#64748B',
  },
  dropdownSelector: {
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
  dropdownText: {
    fontSize: 15,
    color: '#0F172A',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 0.48,
  },
  bmiCard: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 8,
  },
  bmiLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 4,
  },
  bmiValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  bmiBadge: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  bmiBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  discardButton: {
    flex: 0.46,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discardButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  saveButton: {
    flex: 0.48,
    backgroundColor: '#14B8A6',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  // Selection Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalOptionSelected: {
    backgroundColor: '#E0F7F5',
    borderRadius: 6,
  },
  modalOptionText: {
    fontSize: 15,
    color: '#475569',
  },
  modalOptionTextSelected: {
    color: '#0D5C46',
    fontWeight: '700',
  },
  // Date Picker Overlay
  datePickerOverlay: {
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
    color: '#14B8A6',
    fontWeight: '700',
  },
});

export default EditProfileScreen;
