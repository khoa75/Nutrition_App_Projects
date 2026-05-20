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
import Slider from '@react-native-community/slider';
import { userService, type UserProfileData } from '../services/userService';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type AdjustGoalsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdjustGoals'>;

const ACTIVITY_OPTIONS = [
  { label: 'SEDENTARY', value: 'SEDENTARY' },
  { label: 'LIGHT ACTIVE', value: 'LIGHT_ACTIVE' },
  { label: 'ACTIVE', value: 'ACTIVE' },
  { label: 'VERY ACTIVE', value: 'VERY_ACTIVE' },
];

const AdjustGoalsScreen: React.FC = () => {
  const navigation = useNavigation<AdjustGoalsNavigationProp>();

  // Profile data from backend
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [goalType, setGoalType] = useState<'LOSE' | 'MAINTAIN' | 'GAIN'>('LOSE');
  const [kgPerWeek, setKgPerWeek] = useState(0.5);
  const [activityLevel, setActivityLevel] = useState<'SEDENTARY' | 'LIGHT_ACTIVE' | 'ACTIVE' | 'VERY_ACTIVE'>('ACTIVE');

  const [goalCalories, setGoalCalories] = useState<number>(2000);

  // Modals state
  const [activityModalVisible, setActivityModalVisible] = useState(false);

  // Fetch initial profile
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await userService.getUserProfile();
      setProfile(data);

      setHeight(data.height ? String(data.height) : '');
      setWeight(data.currentWeight ? String(data.currentWeight) : '');
      setTargetWeight(data.targetWeight ? String(data.targetWeight) : '');
      setGoalType((data.goalType as 'LOSE' | 'MAINTAIN' | 'GAIN') || 'LOSE');
      setKgPerWeek(data.kgPerWeek != null ? data.kgPerWeek : 0.5);
      setActivityLevel((data.activityLevel as 'SEDENTARY' | 'LIGHT_ACTIVE' | 'ACTIVE' | 'VERY_ACTIVE') || 'ACTIVE');
      setGoalCalories(data.goalCalories != null ? data.goalCalories : 2000);
    } catch (error) {
      console.log('Fetch profile error in AdjustGoalsScreen:', error);
      // Suppress the alert for 403 or general fetch errors to avoid UI disruption
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async () => {
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

    setSaving(true);
    try {
      const payload = {
        dob: profile?.dob || '2000-05-20',
        gender: profile?.gender || 'MALE',
        activityLevel,
        currentWeight: w,
        height: h,
        targetWeight: tw,
        goalType,
        kgPerWeek,
      };

      await userService.updateGoalCalories(payload);
      Alert.alert('Success', 'Goals updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      console.error('Update goals error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to update goals.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#14B8A6" />
        <Text style={styles.loadingText}>Loading target plan...</Text>
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
        <Text style={styles.headerTitle}>Adjust Goals</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Height and Weight Row */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Current Height (cm)</Text>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
              placeholder="180"
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
              placeholder="85.5"
              placeholderTextColor="#94A3B8"
            />
          </View>
        </View>

        {/* Target Weight */}
        <Text style={styles.label}>Target Weight (kg)</Text>
        <TextInput
          style={styles.input}
          value={targetWeight}
          onChangeText={setTargetWeight}
          keyboardType="numeric"
          placeholder="78.0"
          placeholderTextColor="#94A3B8"
        />

        {/* Current Activity Index Scale Dropdown */}
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

        {/* Strategy Track Mode Selection */}
        <Text style={styles.sectionTitle}>Select Strategy Track Mode</Text>
        <View style={styles.strategyRow}>

          {/* Lose Weight Card */}
          <TouchableOpacity
            style={[
              styles.strategyCard,
              goalType === 'LOSE' && styles.strategyCardActive
            ]}
            activeOpacity={0.85}
            onPress={() => {
              setGoalType('LOSE');
              if (kgPerWeek === 0) setKgPerWeek(0.5);
            }}
          >
            <Ionicons
              name="trending-down"
              size={24}
              color={goalType === 'LOSE' ? '#0D5C46' : '#64748B'}
              style={styles.strategyIcon}
            />
            <Text style={[styles.strategyText, goalType === 'LOSE' && styles.strategyTextActive]}>
              Lose Weight
            </Text>
          </TouchableOpacity>

          {/* Balance Weight Card */}
          <TouchableOpacity
            style={[
              styles.strategyCard,
              goalType === 'MAINTAIN' && styles.strategyCardActive
            ]}
            activeOpacity={0.85}
            onPress={() => {
              setGoalType('MAINTAIN');
              setKgPerWeek(0.0);
            }}
          >
            <Ionicons
              name="scale-outline"
              size={24}
              color={goalType === 'MAINTAIN' ? '#0D5C46' : '#64748B'}
              style={styles.strategyIcon}
            />
            <Text style={[styles.strategyText, goalType === 'MAINTAIN' && styles.strategyTextActive]}>
              Balance Weight
            </Text>
          </TouchableOpacity>

          {/* Gain Weight Card */}
          <TouchableOpacity
            style={[
              styles.strategyCard,
              goalType === 'GAIN' && styles.strategyCardActive
            ]}
            activeOpacity={0.85}
            onPress={() => {
              setGoalType('GAIN');
              if (kgPerWeek === 0) setKgPerWeek(0.5);
            }}
          >
            <Ionicons
              name="trending-up"
              size={24}
              color={goalType === 'GAIN' ? '#0D5C46' : '#64748B'}
              style={styles.strategyIcon}
            />
            <Text style={[styles.strategyText, goalType === 'GAIN' && styles.strategyTextActive]}>
              Gain Weight
            </Text>
          </TouchableOpacity>

        </View>

        {/* Slider Section */}
        {goalType !== 'MAINTAIN' && (
          <View style={styles.sliderContainer}>
            <View style={styles.sliderLabelRow}>
              <Text style={styles.sliderLabel}>
                Lose or Gain Weight per Week{'\n'}Tracker Scale
              </Text>
              <Text style={styles.sliderValue}>{kgPerWeek.toFixed(1)} kg</Text>
            </View>

            <Slider
              style={styles.slider}
              minimumValue={0.1}
              maximumValue={1.0}
              step={0.1}
              value={kgPerWeek}
              onValueChange={setKgPerWeek}
              minimumTrackTintColor="#14B8A6"
              maximumTrackTintColor="#E2E8F0"
              thumbTintColor="#14B8A6"
            />
            <View style={styles.sliderMinMaxRow}>
              <Text style={styles.sliderLimitText}>0.1kg</Text>
              <Text style={styles.sliderLimitText}>1.0kg</Text>
            </View>
          </View>
        )}

        {/* Suggested daily budget box */}
        {/* <View style={styles.suggestedBox}>
          <Text style={styles.suggestedLabel}>Your Suggested Daily Budget Goal</Text>
          <Text style={styles.suggestedValue}>
            {goalCalories.toLocaleString()} Calories / Day
          </Text>
        </View> */}

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          activeOpacity={0.8}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.submitButtonText}>Apply New Target Plan</Text>
          )}
        </TouchableOpacity>

      </ScrollView>

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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 0.48,
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
    marginBottom: 6,
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
    marginBottom: 6,
  },
  dropdownText: {
    fontSize: 15,
    color: '#0F172A',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 22,
    marginBottom: 12,
  },
  strategyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  strategyCard: {
    flex: 0.31,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  strategyCardActive: {
    backgroundColor: '#E0F7F5',
    borderColor: '#14B8A6',
    borderWidth: 1.5,
  },
  strategyIcon: {
    marginBottom: 8,
  },
  strategyText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    textAlign: 'center',
  },
  strategyTextActive: {
    color: '#0D5C46',
    fontWeight: '700',
  },
  sliderContainer: {
    marginBottom: 24,
  },
  sliderLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sliderLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    lineHeight: 16,
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0D5C46',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderMinMaxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  sliderLimitText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
  },
  suggestedBox: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FCD34D',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    marginTop: 10,
    shadowColor: '#FCD34D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  suggestedLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 10,
  },
  suggestedValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#10B981',
  },
  submitButton: {
    backgroundColor: '#14B8A6',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 15,
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
});

export default AdjustGoalsScreen;
