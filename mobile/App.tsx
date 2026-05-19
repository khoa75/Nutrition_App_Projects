import 'react-native-url-polyfill/auto';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import SplashScreen from './src/components/SplashScreen';
import LoginScreen from './src/components/LoginScreen';
import RegisterScreen from './src/components/RegisterScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import { theme } from './src/theme/theme';

const Stack = createNativeStackNavigator();

const AuthNavigator = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToLogin = () => setIsLogin(true);
  const switchToRegister = () => setIsLogin(false);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth">
        {() => isLogin ? (
          <LoginScreen 
            onLoginSuccess={onLoginSuccess}
            onSwitchToRegister={switchToRegister}
          />
        ) : (
          <RegisterScreen 
            onRegisterSuccess={onLoginSuccess}
            onSwitchToLogin={switchToLogin}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const MainApp = () => {
  const { isLoading, isAuthenticated } = useAuth();
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticatedState(true);
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated && isAuthenticatedState ? (
            <Stack.Screen name="Main" component={MainTabNavigator} />
          ) : (
            <Stack.Screen name="AuthStack">
              {() => <AuthNavigator onLoginSuccess={handleLoginSuccess} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

export default App;