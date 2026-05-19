import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../theme/colors';
import { logService, LogNutritionPreview } from '../services/logService';
import { foodService } from '../services/foodService';

const FoodSearchScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  // States
  const [foodName, setFoodName] = useState('');
  const [gram, setGram] = useState('100');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewResult, setPreviewResult] = useState<LogNutritionPreview | null>(null);

  // Custom food form states
  const [searchFailed, setSearchFailed] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customCalories, setCustomCalories] = useState('0');
  const [customProtein, setCustomProtein] = useState('0');
  const [customCarbs, setCustomCarbs] = useState('0');
  const [customFats, setCustomFats] = useState('0');

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('DashboardTab');
    }
  };

  const handleSearch = async () => {
    if (!foodName.trim()) {
      Alert.alert('Validation Error', 'Please enter a food name to search.');
      return;
    }
    const gramVal = parseFloat(gram);
    if (isNaN(gramVal) || gramVal <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid weight in grams.');
      return;
    }

    setLoading(true);
    setPreviewResult(null);
    setSearchFailed(false);
    try {
      const data = await logService.previewLogByName(foodName.trim(), gramVal);
      setPreviewResult(data);
    } catch (err: any) {
      console.log('Search food preview error:', err);
      // Switch to custom creation UI
      setSearchFailed(true);
      setCustomName(foodName.trim());
      setCustomCalories('0');
      setCustomProtein('0');
      setCustomCarbs('0');
      setCustomFats('0');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLog = async () => {
    const finalFoodName = previewResult ? previewResult.foodName : foodName.trim();
    if (!finalFoodName) {
      Alert.alert('Validation Error', 'Please search for a food first.');
      return;
    }
    const gramVal = parseFloat(gram);
    if (isNaN(gramVal) || gramVal <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid weight in grams.');
      return;
    }

    setSaving(true);
    try {
      const loggedAtStr = new Date().toISOString().slice(0, 19); // YYYY-MM-DDTHH:mm:ss
      await logService.createLogByName(finalFoodName, gramVal, loggedAtStr);
      Alert.alert('Success', `Successfully logged ${gramVal}g of ${finalFoodName}!`, [
        {
          text: 'OK',
          onPress: () => {
            // Reset fields and navigate back
            setFoodName('');
            setGram('100');
            setPreviewResult(null);
            setSearchFailed(false);
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('DashboardTab');
            }
          },
        },
      ]);
    } catch (err: any) {
      console.log('Save log error:', err);
      const msg = err.response?.data?.message || 'Failed to save food log.';
      Alert.alert('Error', msg);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCustomFood = async () => {
    if (!customName.trim()) {
      Alert.alert('Validation Error', 'Please enter a food name.');
      return;
    }
    const caloriesVal = parseFloat(customCalories);
    const proteinVal = parseFloat(customProtein);
    const carbsVal = parseFloat(customCarbs);
    const fatsVal = parseFloat(customFats);
    const gramVal = parseFloat(gram);

    if (isNaN(caloriesVal) || caloriesVal < 0) {
      Alert.alert('Validation Error', 'Please enter a valid calories value.');
      return;
    }
    if (isNaN(proteinVal) || proteinVal < 0) {
      Alert.alert('Validation Error', 'Please enter a valid protein value.');
      return;
    }
    if (isNaN(carbsVal) || carbsVal < 0) {
      Alert.alert('Validation Error', 'Please enter a valid carbs value.');
      return;
    }
    if (isNaN(fatsVal) || fatsVal < 0) {
      Alert.alert('Validation Error', 'Please enter a valid fats value.');
      return;
    }
    if (isNaN(gramVal) || gramVal <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid weight in grams.');
      return;
    }

    setSaving(true);
    try {
      // 1. Create custom food item first (POST /api/foods)
      await foodService.createFood({
        name: customName.trim(),
        caloriesPer100g: caloriesVal,
        protein: proteinVal,
        carbs: carbsVal,
        fats: fatsVal,
      });

      // 2. Create food log entry (POST /api/logs/by-name)
      const loggedAtStr = new Date().toISOString().slice(0, 19);
      await logService.createLogByName(customName.trim(), gramVal, loggedAtStr);

      Alert.alert('Success', `Successfully created & logged ${gramVal}g of ${customName.trim()}!`, [
        {
          text: 'OK',
          onPress: () => {
            // Reset fields and navigate back
            setFoodName('');
            setGram('100');
            setPreviewResult(null);
            setSearchFailed(false);
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('DashboardTab');
            }
          },
        },
      ]);
    } catch (err: any) {
      console.log('Create and log food error:', err);
      const msg = err.response?.data?.message || 'Failed to create and log food.';
      Alert.alert('Error', msg);
    } finally {
      setSaving(false);
    }
  };


  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerLeft} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color="#0D5C46" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Food</Text>
        <TouchableOpacity style={styles.headerRight} activeOpacity={0.7}>
          <Ionicons name="swap-horizontal" size={24} color="#0D5C46" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Search Input Row */}
            <View style={styles.searchRow}>
              <View style={styles.searchInputContainer}>
                <Ionicons name="search-outline" size={20} color="#94A3B8" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  value={foodName}
                  onChangeText={(val) => {
                    setFoodName(val);
                    if (val.trim() === '') {
                      setSearchFailed(false);
                      setPreviewResult(null);
                    }
                  }}
                  placeholder="Search food name..."
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="words"
                  returnKeyType="search"
                  onSubmitEditing={handleSearch}
                />
                {foodName.length > 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      setFoodName('');
                      setSearchFailed(false);
                      setPreviewResult(null);
                    }}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="close-circle" size={18} color="#94A3B8" style={{ marginRight: 4 }} />
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity
                style={styles.searchButton}
                activeOpacity={0.8}
                onPress={handleSearch}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Ionicons name="search" size={20} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            </View>

            {/* Grams Input Box */}
            <View style={styles.gramsContainer}>
              <Text style={styles.gramsLabel}>GRAMS INPUT</Text>
              <View style={styles.gramsInputWrapper}>
                <TextInput
                  style={styles.gramsInput}
                  value={gram}
                  onChangeText={setGram}
                  keyboardType="numeric"
                  placeholder="100"
                  maxLength={5}
                />
                <Text style={styles.gramsSuffix}>g</Text>
              </View>
            </View>

            {/* No match indicator */}
            {searchFailed && (
              <View style={styles.noMatchContainer}>
                <View style={styles.noMatchIconWrapper}>
                  <Ionicons name="search-outline" size={32} color="#94A3B8" />
                  <View style={styles.noMatchCloseWrapper}>
                    <Ionicons name="close-circle" size={16} color="#EF4444" />
                  </View>
                </View>
                <Text style={styles.noMatchText}>No items match your search.</Text>
              </View>
            )}

            {/* Custom Food Creation Card */}
            {searchFailed && (
              <View style={styles.customCard}>
                <Text style={styles.customCardTitle}>NO MATCHES FOUND. CREATE A CUSTOM FOOD ITEM BELOW:</Text>

                <View style={styles.customFormInner}>
                  {/* Food Name */}
                  <Text style={styles.customFieldLabel}>Food Name</Text>
                  <TextInput
                    style={styles.customNameInput}
                    value={customName}
                    onChangeText={setCustomName}
                    placeholder="e.g. Organic Kale Chips"
                    placeholderTextColor="#94A3B8"
                  />

                  {/* Grid layout */}
                  <View style={styles.customGrid}>
                    {/* Left Column */}
                    <View style={styles.customGridCol}>
                      <Text style={styles.customFieldLabel}>Calories (kcal)</Text>
                      <TextInput
                        style={styles.customGridInput}
                        value={customCalories}
                        onChangeText={setCustomCalories}
                        keyboardType="numeric"
                        placeholder="0"
                        placeholderTextColor="#94A3B8"
                      />

                      <Text style={styles.customFieldLabel}>Carbs (g)</Text>
                      <TextInput
                        style={styles.customGridInput}
                        value={customCarbs}
                        onChangeText={setCustomCarbs}
                        keyboardType="numeric"
                        placeholder="0"
                        placeholderTextColor="#94A3B8"
                      />
                    </View>

                    {/* Right Column */}
                    <View style={styles.customGridCol}>
                      <Text style={styles.customFieldLabel}>Protein (g)</Text>
                      <TextInput
                        style={styles.customGridInput}
                        value={customProtein}
                        onChangeText={setCustomProtein}
                        keyboardType="numeric"
                        placeholder="0"
                        placeholderTextColor="#94A3B8"
                      />

                      <Text style={styles.customFieldLabel}>Fats (g)</Text>
                      <TextInput
                        style={styles.customGridInput}
                        value={customFats}
                        onChangeText={setCustomFats}
                        keyboardType="numeric"
                        placeholder="0"
                        placeholderTextColor="#94A3B8"
                      />
                    </View>
                  </View>

                  <View style={styles.customCardFooterRow}>
                    <Ionicons name="information-circle-outline" size={16} color="#64748B" />
                    <Text style={styles.customCardFooterText}>
                      Values will scale automatically based on the 'Grams Input' specified in the header panel.
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Result Card */}
            {previewResult && (
              <View style={styles.resultCard}>
                <Text style={styles.resultTitle}>
                  <Text style={styles.resultFoodName}>{previewResult.foodName}</Text>
                  <Text style={styles.resultCalculated}> - Calculated for {previewResult.gram || '0'}g input</Text>
                </Text>

                <View style={styles.nutrientsRow}>
                  <Text style={styles.nutrientText}>
                    <Text style={styles.nutrientLabel}>CALORIES:</Text> {previewResult.calories.toFixed(0)} KCAL
                  </Text>
                  <Text style={styles.nutrientDot}> • </Text>
                  <Text style={styles.nutrientText}>
                    <Text style={styles.nutrientLabel}>PROTEIN:</Text> {previewResult.protein.toFixed(1)}G
                  </Text>
                </View>

                <View style={styles.nutrientsRow}>
                  <Text style={styles.nutrientDot}>• </Text>
                  <Text style={styles.nutrientText}>
                    <Text style={styles.nutrientLabel}>CARBS:</Text> {previewResult.carbs.toFixed(1)}G
                  </Text>
                  <Text style={styles.nutrientDot}> • </Text>
                  <Text style={styles.nutrientText}>
                    <Text style={styles.nutrientLabel}>FATS:</Text> {previewResult.fats.toFixed(1)}G
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Bottom Action Button */}
          {searchFailed ? (
            <TouchableOpacity
              style={[styles.submitButton, styles.submitButtonCustom, saving && styles.submitButtonDisabled]}
              activeOpacity={0.8}
              onPress={handleSaveCustomFood}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <>
                  <Ionicons name="add-circle-outline" size={22} color="#FFFFFF" />
                  <Text style={styles.submitButtonText}>Create & Add Custom Food</Text>
                </>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.submitButton, (!previewResult || saving) && styles.submitButtonDisabled]}
              activeOpacity={0.8}
              onPress={handleSaveLog}
              disabled={!previewResult || saving}
            >
              {saving ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <>
                  <Ionicons name="checkmark-circle-outline" size={22} color="#FFFFFF" />
                  <Text style={styles.submitButtonText}>Add to Log Request</Text>
                </>
              )}
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerLeft: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0D5C46',
  },
  headerRight: {
    padding: 4,
  },
  content: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 52,
    marginRight: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
    paddingVertical: 0,
  },
  searchButton: {
    width: 52,
    height: 52,
    backgroundColor: '#2CC5B8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gramsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 20,
  },
  gramsLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.5,
    marginRight: 16,
  },
  gramsInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
  },
  gramsInput: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
    textAlign: 'right',
    flex: 1,
    height: '100%',
    paddingRight: 4,
  },
  gramsSuffix: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 22,
  },
  resultFoodName: {
    fontWeight: '700',
    color: '#0F172A',
  },
  resultCalculated: {
    color: '#64748B',
    fontSize: 14,
  },
  nutrientsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  nutrientText: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '600',
  },
  nutrientLabel: {
    color: '#0D5C46',
    fontWeight: '700',
  },
  nutrientDot: {
    color: '#94A3B8',
    marginHorizontal: 4,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#2CC5B8',
    height: 54,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    shadowColor: '#2CC5B8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#99E3DD',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  noMatchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  noMatchIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  noMatchCloseWrapper: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  noMatchText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748B',
  },
  customCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    padding: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24,
  },
  customCardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  customFormInner: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
  },
  customFieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
    marginTop: 8,
  },
  customNameInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 40,
    fontSize: 14,
    color: '#1E293B',
  },
  customGrid: {
    flexDirection: 'row',
    marginHorizontal: -6,
  },
  customGridCol: {
    flex: 1,
    paddingHorizontal: 6,
  },
  customGridInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 40,
    fontSize: 14,
    color: '#1E293B',
    textAlign: 'center',
  },
  customCardFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    paddingHorizontal: 4,
  },
  customCardFooterText: {
    fontSize: 11,
    color: '#64748B',
    marginLeft: 6,
    flex: 1,
    lineHeight: 15,
  },
  submitButtonCustom: {
    backgroundColor: '#3B82F6',
    shadowColor: '#3B82F6',
  },
});

export default FoodSearchScreen;