import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

const SettingsScreen: React.FC = () => (
  <SafeAreaView style={styles.safe}>
    <View style={styles.container}>
      <Ionicons name="settings" size={48} color={Colors.primary} />
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.body}>App settings and preferences.</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  title: { fontSize: 24, fontWeight: '700', color: Colors.textDark, marginTop: 16 },
  body: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', marginTop: 12 },
});

export default SettingsScreen;