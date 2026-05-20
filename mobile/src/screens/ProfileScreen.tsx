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
import { useAuthStore } from '../store/authStore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const ProfileScreen: React.FC = () => {
  const { logout } = useAuthStore();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Profile data from backend
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  // Modals visibility
  const [editPersonalVisible, setEditPersonalVisible] = useState(false);
  const [adjustGoalVisible, setAdjustGoalVisible] = useState(false);

  // --- Edit Personal Info Form State ---
  const [editName, setEditName] = useState('');
  const [editGender, setEditGender] = useState<'MALE' | 'FEMALE'>('MALE');
  const [editDob, setEditDob] = useState<string | null>(null); // YYYY-MM-DD
  const [editHeight, setEditHeight] = useState('');
  const [editWeight, setEditWeight] = useState('');

  // --- Adjust Goal Form State ---
  const [editTargetWeight, setEditTargetWeight] = useState('');
  const [editGoalType, setEditGoalType] = useState<'LOSE' | 'MAINTAIN' | 'GAIN'>('LOSE');
  const [editKgPerWeek, setEditKgPerWeek] = useState(0.5);
  const [editActivityLevel, setEditActivityLevel] = useState<'SEDENTARY' | 'LIGHT_ACTIVE' | 'ACTIVE' | 'VERY_ACTIVE'>('ACTIVE');

  // --- Temporary Date Picker State ---
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDay, setTempDay] = useState<number | string>(20);
  const [tempMonth, setTempMonth] = useState(4); // May (0-indexed)
  const [tempYear, setTempYear] = useState<number | string>(2000);

  // Submitting state for updating
  const [updating, setUpdating] = useState(false);

  const initializeForms = React.useCallback((data: UserProfileData) => {
    // Personal Info
    setEditName(data.name || '');
    setEditGender((data.gender as 'MALE' | 'FEMALE') || 'MALE');
    setEditDob(data.dob);
    setEditHeight(data.height ? String(data.height) : '');
    setEditWeight(data.currentWeight ? String(data.currentWeight) : '');

    if (data.dob) {
      const parts = data.dob.split('-');
      if (parts.length === 3) {
        setTempYear(parseInt(parts[0]));
        setTempMonth(parseInt(parts[1]) - 1);
        setTempDay(parseInt(parts[2]));
      }
    }

    // Goal Info
    setEditTargetWeight(data.targetWeight ? String(data.targetWeight) : '');
    setEditGoalType(data.goalType || 'LOSE');
    setEditKgPerWeek(data.kgPerWeek != null ? data.kgPerWeek : 0.5);
    setEditActivityLevel(data.activityLevel || 'ACTIVE');
  }, []);

  // Fetch profile on mount
  const fetchProfile = React.useCallback(async (showSpinner = false) => {
    console.log('fetchProfile executing...');
    if (showSpinner) {
      setLoading(true);
    }
    try {
      const data = await userService.getUserProfile();
      console.log('fetchProfile returned goalCalories:', data.goalCalories, 'targetWeight:', data.targetWeight);
      setProfile(data);
      initializeForms(data);
    } catch (error) {
      console.log('Fetch profile error:', error);
      // Suppress the alert for 403 or general fetch errors to avoid UI disruption
    } finally {
      setLoading(false);
    }
  }, [initializeForms]);

  useEffect(() => {
    // First load with spinner
    fetchProfile(true);

    // Fetch on focus without spinner to update silently
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProfile(false);
    });

    return unsubscribe;
  }, [navigation, fetchProfile]);

  // Human friendly DOB format
  const formattedDob = useMemo(() => {
    if (!editDob) return 'Select birthdate';
    const parts = editDob.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const monthIdx = parseInt(parts[1]) - 1;
      const day = parseInt(parts[2]);
      return `${MONTHS[monthIdx]} ${day}, ${year}`;
    }
    return editDob;
  }, [editDob]);

  const handleConfirmDate = () => {
    const yearNum = typeof tempYear === 'string' ? parseInt(tempYear, 10) : tempYear;
    const dayNum = typeof tempDay === 'string' ? parseInt(tempDay, 10) : tempDay;

    if (isNaN(yearNum) || yearNum < 1900 || yearNum > 2100) {
      Alert.alert('Validation Error', 'Year must be between 1900 and 2100.');
      return;
    }
    if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
      Alert.alert('Validation Error', 'Day must be between 1 and 31.');
      return;
    }

    const formattedMonth = String(tempMonth + 1).padStart(2, '0');
    const formattedDay = String(dayNum).padStart(2, '0');
    setEditDob(`${yearNum}-${formattedMonth}-${formattedDay}`);
    setShowDatePicker(false);
  };

  // Save Personal Info
  const handleSavePersonal = async () => {
    if (!editName.trim()) {
      Alert.alert('Validation Error', 'Name is required.');
      return;
    }
    const h = parseFloat(editHeight);
    const w = parseFloat(editWeight);
    if (isNaN(h) || h <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid height.');
      return;
    }
    if (isNaN(w) || w <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid weight.');
      return;
    }
    if (!editDob) {
      Alert.alert('Validation Error', 'Please select your birthdate.');
      return;
    }

    setUpdating(true);
    try {
      const payload = {
        name: editName,
        dob: editDob,
        gender: editGender,
        currentWeight: w,
        height: h,
        // Carry over other values as required by GoalCaloriesRequest
        targetWeight: profile ? profile.targetWeight : w,
        activityLevel: profile ? profile.activityLevel : editActivityLevel,
        goalType: profile ? profile.goalType : editGoalType,
        kgPerWeek: profile ? profile.kgPerWeek : editKgPerWeek,
      };

      const updatedProfile = await userService.updateProfile(payload);
      setProfile(updatedProfile);
      Alert.alert('Success', 'Personal information updated successfully.');
      setEditPersonalVisible(false);
    } catch (error) {
      console.log('Update personal details failed:', error);
      Alert.alert('Error', 'Could not update your personal information.');
    } finally {
      setUpdating(false);
    }
  };

  // Save Goals & Strategy
  const handleSaveGoal = async () => {
    const tw = parseFloat(editTargetWeight);
    if (isNaN(tw) || tw <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid target weight.');
      return;
    }

    setUpdating(true);
    try {
      const payload = {
        name: profile?.name || editName,
        dob: profile?.dob || editDob,
        gender: profile?.gender || editGender,
        currentWeight: profile?.currentWeight || parseFloat(editWeight),
        height: profile?.height || parseFloat(editHeight),
        targetWeight: tw,
        activityLevel: editActivityLevel,
        goalType: editGoalType,
        kgPerWeek: editKgPerWeek,
      };

      const updatedProfile = await userService.updateProfile(payload);
      setProfile(updatedProfile);
      Alert.alert('Success', 'Goal preferences updated successfully.');
      setAdjustGoalVisible(false);
    } catch (error) {
      console.log('Update goals failed:', error);
      Alert.alert('Error', 'Could not update your goals.');
    } finally {
      setUpdating(false);
    }
  };

  // Logout account dialog
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out of your account?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => logout() },
    ]);
  };

  // Mapping goal type code to human label
  const goalStrategyLabel = useMemo(() => {
    if (!profile) return 'HEALTH STRATEGY';
    switch (profile.goalType) {
      case 'LOSE': return 'WEIGHT LOSS STRATEGY';
      case 'GAIN': return 'WEIGHT GAIN STRATEGY';
      case 'MAINTAIN': return 'MAINTENANCE STRATEGY';
      default: return 'HEALTH STRATEGY';
    }
  }, [profile]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Fetching profile...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      {/* Vitality Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logoBox}>
            <Ionicons name="pulse" size={20} color="#0D5C46" />
          </View>
          <Text style={styles.logoText}>Vitality</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* User Card */}
        <View style={styles.profileCard}>
          <Text style={styles.profileName}>{profile?.name || 'User Profile'}</Text>
          <Text style={styles.profileEmail}>{profile?.email || 'user@email.com'}</Text>
        </View>

        {/* Active Plan Metrics */}
        <View style={styles.metricsCard}>
          <View style={styles.metricsHeader}>
            <Text style={styles.metricsTitle}>Active Plan Metrics</Text>
            <View style={styles.strategyPill}>
              <Text style={styles.strategyPillText}>{goalStrategyLabel}</Text>
            </View>
          </View>

          <View style={styles.metricsGrid}>
            <View style={[styles.metricBox, { backgroundColor: '#EBFDF9' }]}>
              <Text style={styles.metricLabel}>Daily Budget</Text>
              <Text style={[styles.metricValue, { color: '#0D5C46' }]}>
                {profile?.goalCalories?.toLocaleString() || '2,000'} Kcal
              </Text>
            </View>

            <View style={[styles.metricBox, { backgroundColor: '#F8FAFC' }]}>
              <Text style={styles.metricLabel}>Target Weight</Text>
              <Text style={[styles.metricValue, { color: '#0F172A' }]}>
                {profile?.targetWeight ? profile.targetWeight.toFixed(1) : '70.0'} kg
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('EditProfile');
            }}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="person-outline" size={22} color="#0F172A" />
              </View>
              <Text style={styles.menuText}>Edit Personal Information</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('AdjustGoals');
            }}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="disc-outline" size={22} color="#0F172A" />
              </View>
              <Text style={styles.menuText}>Adjust Goal</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Logout Account Button */}
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout Account</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* --- EDIT PERSONAL INFO MODAL --- */}
      <Modal visible={editPersonalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle}>Personal Information</Text>
              <TouchableOpacity onPress={() => setEditPersonalVisible(false)}>
                <Ionicons name="close" size={24} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalScroll} showsVerticalScrollIndicator={false}>

              <Text style={styles.modalLabel}>FULL NAME</Text>
              <TextInput
                style={styles.modalInput}
                value={editName}
                onChangeText={setEditName}
                placeholder="John Doe"
              />

              <Text style={styles.modalLabel}>GENDER</Text>
              <View style={styles.genderContainer}>
                {(['MALE', 'FEMALE'] as const).map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={[
                      styles.genderOption,
                      editGender === g && styles.genderOptionSelected,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setEditGender(g)}
                  >
                    <Text
                      style={[
                        styles.genderText,
                        editGender === g && styles.genderTextSelected,
                      ]}
                    >
                      {g.charAt(0) + g.slice(1).toLowerCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.modalLabel}>BIRTHDATE</Text>
              <TouchableOpacity
                style={styles.dateSelector}
                activeOpacity={0.8}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>{formattedDob}</Text>
                <Ionicons name="calendar-outline" size={20} color="#64748B" />
              </TouchableOpacity>

              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.modalLabel}>HEIGHT (CM)</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={editHeight}
                    onChangeText={setEditHeight}
                    keyboardType="numeric"
                    placeholder="175"
                  />
                </View>

                <View style={styles.column}>
                  <Text style={styles.modalLabel}>WEIGHT (KG)</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={editWeight}
                    onChangeText={setEditWeight}
                    keyboardType="numeric"
                    placeholder="70"
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.modalSaveButton}
                activeOpacity={0.8}
                onPress={handleSavePersonal}
                disabled={updating}
              >
                {updating ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.modalSaveButtonText}>Save Changes</Text>
                )}
              </TouchableOpacity>

            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* --- ADJUST GOAL MODAL --- */}
      <Modal visible={adjustGoalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle}>Adjust Goal Preferences</Text>
              <TouchableOpacity onPress={() => setAdjustGoalVisible(false)}>
                <Ionicons name="close" size={24} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalScroll} showsVerticalScrollIndicator={false}>

              <Text style={styles.modalLabel}>TARGET WEIGHT (KG)</Text>
              <TextInput
                style={styles.modalInput}
                value={editTargetWeight}
                onChangeText={setEditTargetWeight}
                keyboardType="numeric"
                placeholder="65"
              />

              <Text style={styles.modalLabel}>GOAL STRATEGY</Text>
              <View style={styles.genderContainer}>
                {(['LOSE', 'MAINTAIN', 'GAIN'] as const).map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={[
                      styles.genderOption,
                      editGoalType === g && styles.genderOptionSelected,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setEditGoalType(g)}
                  >
                    <Text
                      style={[
                        styles.genderText,
                        editGoalType === g && styles.genderTextSelected,
                      ]}
                    >
                      {g.charAt(0) + g.slice(1).toLowerCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Target Rate Slider */}
              <View style={styles.sliderLabelRow}>
                <Text style={styles.sliderLabel}>TARGET RATE PER WEEK</Text>
                <Text style={styles.sliderValue}>{editKgPerWeek.toFixed(1)} kg</Text>
              </View>

              <Slider
                style={styles.slider}
                minimumValue={0.0}
                maximumValue={1.0}
                step={0.1}
                value={editKgPerWeek}
                onValueChange={setEditKgPerWeek}
                minimumTrackTintColor={Colors.primary}
                maximumTrackTintColor="#E2E8F0"
                thumbTintColor={Colors.primary}
              />
              <View style={styles.sliderRangeRow}>
                <Text style={styles.sliderRangeText}>0.0 kg</Text>
                <Text style={styles.sliderRangeText}>1.0 kg</Text>
              </View>

              <Text style={styles.modalLabel}>DAILY ACTIVITY LEVEL</Text>
              <View style={styles.activityGrid}>
                {(['SEDENTARY', 'LIGHT_ACTIVE', 'ACTIVE', 'VERY_ACTIVE'] as const).map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.activityButton,
                      editActivityLevel === level && styles.activityButtonSelected,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setEditActivityLevel(level)}
                  >
                    <Text
                      style={[
                        styles.activityButtonText,
                        editActivityLevel === level && styles.activityButtonTextSelected,
                      ]}
                    >
                      {level.replace('_', ' ')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.modalSaveButton}
                activeOpacity={0.8}
                onPress={handleSaveGoal}
                disabled={updating}
              >
                {updating ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.modalSaveButtonText}>Save Goal Changes</Text>
                )}
              </TouchableOpacity>

            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* --- DATE PICKER MODAL --- */}
      <Modal visible={showDatePicker} transparent animationType="slide">
        <View style={styles.datePickerOverlay}>
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
                    if (/^\d{0,2}$/.test(val)) {
                      setTempDay(val);
                    }
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
                    if (/^\d{0,4}$/.test(val)) {
                      setTempYear(val);
                    }
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
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#E0F7F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0D5C46',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#64748B',
  },
  metricsCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  metricsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  strategyPill: {
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  strategyPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 0.5,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricBox: {
    flex: 0.48,
    borderRadius: 8,
    padding: 16,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  menuContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 14,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  logoutButton: {
    borderWidth: 2,
    borderColor: '#EF4444',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    marginTop: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EF4444',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalHeaderTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  modalScroll: {
    padding: 20,
    paddingBottom: 40,
  },
  modalLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#0F172A',
    backgroundColor: '#FFF',
  },
  genderContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 4,
    marginBottom: 8,
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
  dateSelector: {
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
  modalSaveButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
  },
  modalSaveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  // Target rate slider
  sliderLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 16,
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
    marginBottom: 8,
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
    color: Colors.primary,
    fontWeight: '700',
  },
});

export default ProfileScreen;