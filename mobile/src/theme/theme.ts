import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2ED5C5', // Mint Green
    primaryContainer: '#E0F7FA',
    secondary: '#3B82F6', // Electric Blue
    secondaryContainer: '#EBF5FF',
    accent: '#FFB400', // Sunshine Yellow
    error: '#F44336',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#1E293B',
    onSurface: '#1E293B',
    disabled: '#64748B',
    placeholder: '#64748B',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  roundness: 8,

  animation: {
    scale: 1.0,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#2ED5C5',
    primaryContainer: '#004D40',
    secondary: '#3B82F6',
    secondaryContainer: '#1E3A8A',
    accent: '#FFB400',
    error: '#F44336',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    onSurface: '#FFFFFF',
    disabled: '#64748B',
    placeholder: '#64748B',
    backdrop: 'rgba(0, 0, 0, 0.8)',
  },
  roundness: 8,

  animation: {
    scale: 1.0,
  },
};