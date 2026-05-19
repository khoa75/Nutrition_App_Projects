import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import type { MainTabParamList } from '../types/navigation';
import { Colors } from '../theme/colors';
import DashboardScreen from '../screens/DashboardScreen';
import FoodSearchScreen from '../screens/FoodSearchScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const tabIcons: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
  DashboardTab: 'home',
  SearchTab: 'search',
  ProfileTab: 'person',
};

const MainTabNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: Colors.tabActive,
      tabBarInactiveTintColor: Colors.tabInactive,
      tabBarStyle: {
        backgroundColor: Colors.surface,
        borderTopWidth: 0,
        elevation: 12,
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        height: 60,
        paddingBottom: 8,
        paddingTop: 6,
      },
      tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      tabBarIcon: ({ color, size }) => (
        <Ionicons name={tabIcons[route.name]} size={size} color={color} />
      ),
    })}
  >
    <Tab.Screen name="DashboardTab" component={DashboardScreen} options={{ tabBarLabel: 'Home' }} />
    <Tab.Screen name="SearchTab" component={FoodSearchScreen} options={{ tabBarLabel: 'Search' }} />
    <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
  </Tab.Navigator>
);

export default MainTabNavigator;