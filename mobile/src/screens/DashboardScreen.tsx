import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { useAuthStore } from '../store/authStore';
import { userService, UserProfileData } from '../services/userService';
import { logService, LogResponseData, StatisticsResponseData } from '../services/logService';
import Svg, { Circle, Polyline, Line, Text as SvgText } from 'react-native-svg';
import { useFocusEffect } from '@react-navigation/native';

// Helper to format Date to YYYY-MM-DD
const formatDate = (d: Date) => {
  return d.toISOString().split('T')[0];
};

// Helper to get start of week (Monday)
const getStartOfWeek = (d: Date) => {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

const CircularProgress = ({ size, progress, strokeWidth, color, trackColor, children }: any) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle
          stroke={trackColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          originX={size / 2}
          originY={size / 2}
          rotation="-90"
        />
      </Svg>
      {children}
    </View>
  );
};

const LineChart = ({ data, goals, labels, width, height }: any) => {
  const svgWidth = width - 32;
  const svgHeight = height - 70; // Adjusted for title
  const paddingLeft = 35; // Space for Y labels
  const paddingRight = 10;
  const paddingTop = 10;
  const paddingBottom = 25; // Space for X labels
  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  // 10% headroom for max value
  const maxVal = Math.max(...data, ...goals, 100) * 1.1;

  const getX = (index: number) => paddingLeft + (index * chartWidth) / Math.max(labels.length - 1, 1);
  const getY = (val: number) => svgHeight - paddingBottom - (val / maxVal) * chartHeight;

  const points = data.map((val: number, i: number) => `${getX(i)},${getY(val)}`).join(' ');
  const goalPoints = goals.map((val: number, i: number) => `${getX(i)},${getY(val)}`).join(' ');

  const yTicks = [0, maxVal * 0.25, maxVal * 0.5, maxVal * 0.75, maxVal];

  return (
    <View style={{ width, height, backgroundColor: '#fff', borderRadius: 16, marginTop: 16, padding: 16 }}>
      <Text style={styles.chartTitle}>Weekly Overview</Text>
      <Text style={styles.chartSubtitle}>Calories consumed vs goal</Text>

      <Svg width={svgWidth} height={svgHeight}>
        {/* Y-Axis Grid and Labels */}
        {yTicks.map((val, i) => {
          const y = getY(val);
          return (
            <React.Fragment key={`y-${i}`}>
              <Line
                x1={paddingLeft}
                y1={y}
                x2={svgWidth - paddingRight}
                y2={y}
                stroke="#F1F5F9"
                strokeWidth="1"
              />
              <SvgText
                x={paddingLeft - 8}
                y={y + 3}
                fill="#94A3B8"
                fontSize="10"
                textAnchor="end"
              >
                {Math.round(val)}
              </SvgText>
            </React.Fragment>
          );
        })}

        {/* Goal Line (Dashed) */}
        <Polyline
          points={goalPoints}
          fill="none"
          stroke={Colors.primary}
          strokeWidth="2"
          strokeDasharray="5, 5"
        />

        {/* Actual Line */}
        <Polyline
          points={points}
          fill="none"
          stroke={Colors.error}
          strokeWidth="3"
        />

        {/* Data Points */}
        {data.map((val: number, i: number) => (
          <Circle key={i} cx={getX(i)} cy={getY(val)} r="4" fill={Colors.error} />
        ))}

        {/* X-Axis Labels */}
        {labels.map((label: string, i: number) => (
          <SvgText
            key={i}
            x={getX(i)}
            y={svgHeight - 5}
            fill="#94A3B8"
            fontSize="10"
            textAnchor="middle"
          >
            {label}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
};

const DashboardScreen: React.FC<any> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [logs, setLogs] = useState<LogResponseData[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<StatisticsResponseData | null>(null);

  const [selectedLog, setSelectedLog] = useState<LogResponseData | null>(null);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [editGram, setEditGram] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const openActionMenu = (log: LogResponseData) => {
    setSelectedLog(log);
    setActionModalVisible(true);
  };

  const handleDelete = () => {
    setActionModalVisible(false);
    if (!selectedLog) return;
    Alert.alert(
      'Delete Log',
      'Are you sure you want to delete this meal?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setActionLoading(true);
              await logService.deleteLog(selectedLog.id);
              fetchData();
            } catch (e) {
              console.log('Error deleting log', e);
              Alert.alert('Error', 'Could not delete the log.');
            } finally {
              setActionLoading(false);
            }
          }
        }
      ]
    );
  };

  const openUpdateModal = () => {
    setActionModalVisible(false);
    if (selectedLog) {
      setEditGram(selectedLog.gram.toString());
      setUpdateModalVisible(true);
    }
  };

  const handleUpdate = async () => {
    if (!selectedLog) return;
    const gramNum = parseFloat(editGram);
    if (isNaN(gramNum) || gramNum < 0) {
      Alert.alert('Invalid Input', 'Please enter a valid gram amount.');
      return;
    }

    try {
      setActionLoading(true);
      await logService.updateLogGram(selectedLog.id, gramNum);
      setUpdateModalVisible(false);
      fetchData();
    } catch (e) {
      console.log('Error updating log', e);
      Alert.alert('Error', 'Could not update the log.');
    } finally {
      setActionLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const prof = await userService.getUserProfile();
      setProfile(prof);

      let uId = userId;
      if (!uId) {
        const searchRes = await userService.searchUsersByEmail(prof.email);
        if (searchRes && searchRes.length > 0) {
          uId = searchRes[0].id;
          setUserId(uId);
        }
      }

      if (uId) {
        const dateStr = formatDate(selectedDate);
        const logsRes = await logService.getLogs(uId, dateStr, dateStr, 0, 100);
        setLogs(logsRes.content);

        const startOfWeek = getStartOfWeek(selectedDate);
        const startStr = formatDate(startOfWeek);
        const statsRes = await logService.getWeeklyStatistics(uId, startStr);
        setWeeklyStats(statsRes);
      }
    } catch (e) {
      console.log('Error fetching dashboard data', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [selectedDate])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  // Calculations
  const totalCalories = logs.reduce((sum, log) => sum + (log.totalCalories || 0), 0);
  const goalCalories = profile?.goalCalories || 2000;
  const remainingCalories = Math.max(0, goalCalories - totalCalories);
  const calorieProgress = Math.min(1, totalCalories / goalCalories);

  // Macro calculations
  const totalProtein = logs.reduce((sum, log) => sum + ((log.protein || 0) * log.gram) / 100, 0);
  const totalCarbs = logs.reduce((sum, log) => sum + ((log.carbs || 0) * log.gram) / 100, 0);
  const totalFats = logs.reduce((sum, log) => sum + ((log.fats || 0) * log.gram) / 100, 0);

  // Approximate macro targets
  const targetProtein = (goalCalories * 0.3) / 4;
  const targetCarbs = (goalCalories * 0.5) / 4;
  const targetFats = (goalCalories * 0.2) / 9;

  const weekDays = useMemo(() => {
    const start = getStartOfWeek(selectedDate);
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [selectedDate]);

  const monthYearStr = selectedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.logoText}>Vitality</Text>
        <TouchableOpacity style={styles.avatarBtn} onPress={() => navigation.navigate('ProfileTab')}>
          <Text style={styles.avatarText}>{profile?.name?.charAt(0) || 'U'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Selector */}
        <View style={styles.dateSelectorHeader}>
          <Text style={styles.monthText}>{monthYearStr} <Ionicons name="chevron-down" size={16} /></Text>
          <TouchableOpacity onPress={() => setSelectedDate(new Date())}>
            <Text style={styles.todayText}>Today</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.weekDaysRow}>
          {weekDays.map((date, i) => {
            const isSelected = formatDate(date) === formatDate(selectedDate);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);
            return (
              <TouchableOpacity
                key={i}
                style={[styles.dayItem, isSelected && styles.dayItemSelected]}
                onPress={() => setSelectedDate(date)}
              >
                <Text style={[styles.dayName, isSelected && styles.dayTextSelected]}>{dayName}</Text>
                <Text style={[styles.dayNumber, isSelected && styles.dayTextSelected]}>{date.getDate()}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {loading && !refreshing ? (
          <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 40 }} />
        ) : (
          <>
            {/* Calorie Card */}
            <View style={styles.calorieCard}>
              <CircularProgress
                size={180}
                progress={calorieProgress}
                strokeWidth={16}
                color={Colors.primary}
                trackColor="#E2E8F0"
              >
                <View style={styles.calorieInner}>
                  <Text style={styles.calorieValue}>{Math.round(totalCalories).toLocaleString()}</Text>
                  <Text style={styles.calorieLabel}>Kcal consumed</Text>
                </View>
              </CircularProgress>
              <View style={styles.remainingRow}>
                <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                <Text style={styles.remainingText}>Remaining: {Math.round(remainingCalories)} Kcal</Text>
              </View>
            </View>

            {/* Macros */}
            <View style={styles.macrosRow}>
              <View style={styles.macroItem}>
                <Text style={styles.macroTitle}>Protein</Text>
                <CircularProgress size={60} progress={Math.min(1, totalProtein / targetProtein)} strokeWidth={6} color="#F43F5E" trackColor="#FFE4E6">
                  <Text style={styles.macroPercent}>{Math.round((totalProtein / targetProtein) * 100 || 0)}%</Text>
                </CircularProgress>
                <Text style={styles.macroValue}>{Math.round(totalProtein)}g / {Math.round(targetProtein)}g</Text>
              </View>

              <View style={styles.macroItem}>
                <Text style={styles.macroTitle}>Carbs</Text>
                <CircularProgress size={60} progress={Math.min(1, totalCarbs / targetCarbs)} strokeWidth={6} color="#EAB308" trackColor="#FEF9C3">
                  <Text style={styles.macroPercent}>{Math.round((totalCarbs / targetCarbs) * 100 || 0)}%</Text>
                </CircularProgress>
                <Text style={styles.macroValue}>{Math.round(totalCarbs)}g / {Math.round(targetCarbs)}g</Text>
              </View>

              <View style={styles.macroItem}>
                <Text style={styles.macroTitle}>Fats</Text>
                <CircularProgress size={60} progress={Math.min(1, totalFats / targetFats)} strokeWidth={6} color="#8B5CF6" trackColor="#EDE9FE">
                  <Text style={styles.macroPercent}>{Math.round((totalFats / targetFats) * 100 || 0)}%</Text>
                </CircularProgress>
                <Text style={styles.macroValue}>{Math.round(totalFats)}g / {Math.round(targetFats)}g</Text>
              </View>
            </View>

            {/* Today's Meals */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Today's Meals</Text>
            </View>

            {!logs || logs.length === 0 ? (
              <Text style={styles.emptyText}>No meals logged today.</Text>
            ) : (
              logs.map((log) => (
                <View key={log.id} style={styles.mealCard}>
                  <View style={styles.mealIconPlaceholder}>
                    <Text style={styles.mealGramText}>{log.gram}g</Text>
                  </View>
                  <View style={styles.mealInfo}>
                    <Text style={styles.mealName} numberOfLines={1}>{log.foodName}</Text>
                    <Text style={styles.mealMacros}>
                      • P: {Math.round((log.protein || 0) * log.gram / 100)}g • C: {Math.round((log.carbs || 0) * log.gram / 100)}g • F: {Math.round((log.fats || 0) * log.gram / 100)}g
                    </Text>
                  </View>
                  <View style={styles.mealRight}>
                    <View style={styles.mealCalBadge}>
                      <Text style={styles.mealCalText}>+{Math.round(log.totalCalories)} kcal</Text>
                    </View>
                    <TouchableOpacity onPress={() => openActionMenu(log)} style={{ padding: 4 }}>
                      <Ionicons name="ellipsis-vertical" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}

            {/* Weekly Overview */}
            {weeklyStats && weeklyStats.calories && weeklyStats.calories.length > 0 && (
              <LineChart
                data={weeklyStats.calories}
                goals={weeklyStats.goals}
                labels={weeklyStats.labels && weeklyStats.labels.length > 0 ? weeklyStats.labels : weekDays.map(d => `${d.getDate()}/${d.getMonth() + 1}`)}
                width={340}
                height={220}
              />
            )}
          </>
        )}
      </ScrollView>

      {/* Action Menu Modal */}
      <Modal visible={actionModalVisible} transparent animationType="fade" onRequestClose={() => setActionModalVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setActionModalVisible(false)}>
          <View style={styles.actionMenuContainer}>
            <Text style={styles.actionMenuTitle}>{selectedLog?.foodName}</Text>
            <TouchableOpacity style={styles.actionMenuBtn} onPress={openUpdateModal}>
              <Ionicons name="pencil" size={20} color={Colors.primary} />
              <Text style={styles.actionMenuText}>Update Grams</Text>
            </TouchableOpacity>
            <View style={styles.actionMenuDivider} />
            <TouchableOpacity style={styles.actionMenuBtn} onPress={handleDelete}>
              <Ionicons name="trash" size={20} color={Colors.error} />
              <Text style={[styles.actionMenuText, { color: Colors.error }]}>Delete Meal</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Update Gram Modal */}
      <Modal visible={updateModalVisible} transparent animationType="fade" onRequestClose={() => setUpdateModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.updateModalContainer}>
            <Text style={styles.updateModalTitle}>Update {selectedLog?.foodName}</Text>
            <Text style={styles.updateModalLabel}>Grams</Text>
            <TextInput
              style={styles.updateModalInput}
              keyboardType="numeric"
              value={editGram}
              onChangeText={setEditGram}
              placeholder="e.g. 150"
            />
            <View style={styles.updateModalActions}>
              <TouchableOpacity style={styles.updateModalCancelBtn} onPress={() => setUpdateModalVisible(false)} disabled={actionLoading}>
                <Text style={styles.updateModalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.updateModalSaveBtn} onPress={handleUpdate} disabled={actionLoading}>
                {actionLoading ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <Text style={styles.updateModalSaveText}>Save</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0D5C46',
  },
  avatarBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#475569',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  dateSelectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
  },
  todayText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  dayItem: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  dayItemSelected: {
    backgroundColor: Colors.primary,
  },
  dayName: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
  },
  dayTextSelected: {
    color: '#FFF',
  },
  calorieCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  calorieInner: {
    alignItems: 'center',
  },
  calorieValue: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.textDark,
  },
  calorieLabel: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  remainingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  remainingText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
    marginLeft: 8,
  },
  macrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroTitle: {
    fontSize: 14,
    color: Colors.textDark,
    marginBottom: 12,
    fontWeight: '500',
  },
  macroPercent: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textDark,
  },
  macroValue: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 12,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textDark,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  emptyText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginVertical: 20,
  },
  mealCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  mealIconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  mealGramText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textDark,
    marginBottom: 4,
  },
  mealMacros: {
    fontSize: 12,
    color: '#64748B',
  },
  mealRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealCalBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 12,
  },
  mealCalText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textDark,
  },
  chartSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionMenuContainer: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
  },
  actionMenuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textDark,
    marginBottom: 12,
    textAlign: 'center',
  },
  actionMenuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionMenuText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
    marginLeft: 12,
  },
  actionMenuDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 4,
  },
  updateModalContainer: {
    width: '85%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
  },
  updateModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textDark,
    marginBottom: 20,
    textAlign: 'center',
  },
  updateModalLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
    fontWeight: '500',
  },
  updateModalInput: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.textDark,
    marginBottom: 24,
  },
  updateModalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  updateModalCancelBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  updateModalCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
  },
  updateModalSaveBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 8,
    borderRadius: 12,
    backgroundColor: Colors.primary,
  },
  updateModalSaveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default DashboardScreen;