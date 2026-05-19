import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../types/navigation';
import { useAuthStore } from '../../store/authStore';
import { Colors } from '../../theme/colors';
import Logo from '../../components/ui/Logo';
import AppInput from '../../components/ui/AppInput';
import AppButton from '../../components/ui/AppButton';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

interface Props {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login, isLoading } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Invalid email or password';
      Alert.alert('Login Failed', message);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoSection}>
            <Logo size="large" />
            <Text style={styles.tagline}>Sign in to continue tracking</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Email Address"
                  placeholder="example@email.com"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Password"
                  placeholder="••••••••"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  isPassword
                  autoComplete="password"
                  error={errors.password?.message}
                />
              )}
            />
          </View>

          {/* Button */}
          <AppButton
            title="Log In"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            style={styles.button}
          />

          {/* Switch to Register */}
          <View style={styles.switchRow}>
            <Text style={styles.switchText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.switchLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 48,
    paddingBottom: 32,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  tagline: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginTop: 12,
  },
  form: {
    marginBottom: 24,
  },
  button: {
    marginTop: 8,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },
  switchText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  switchLink: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textDark,
  },
});

export default LoginScreen;
