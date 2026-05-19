import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService, AuthResponse, User, Tokens } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: { name: string; email: string; password: string; dob: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on app start
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      const tokens = await authService.getStoredTokens();
      
      if (tokens) {
        // Validate tokens
        const isValid = await authService.validateToken(tokens.accessToken);
        if (isValid) {
          setIsAuthenticated(true);
          // Get user profile
          try {
            const userProfile = await authService.getUserProfile();
            setUser(userProfile);
          } catch (error) {
            console.error('Failed to get user profile:', error);
            // Tokens might be invalid, clear them
            await authService.logout();
            setIsAuthenticated(false);
            setUser(null);
          }
        } else {
          // Tokens are invalid, clear them
          await authService.logout();
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const authResponse: AuthResponse = await authService.login(credentials);
      setUser(authResponse.user);
      setIsAuthenticated(true);
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: { name: string; email: string; password: string; dob: string }) => {
    try {
      setIsLoading(true);
      const newUser: User = await authService.register(userData);
      setUser(newUser);
      setIsAuthenticated(true);
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error: any) {
      console.error('Error during logout:', error);
      // Even if logout fails, clear local state
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      if (isAuthenticated) {
        const userProfile = await authService.getUserProfile();
        setUser(userProfile);
      }
    } catch (error: any) {
      console.error('Failed to refresh user profile:', error);
      // If we can't refresh user profile, it might indicate token issues
      if (error.message.includes('401') || error.message.includes('403')) {
        await logout();
      }
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Custom hook for checking authentication status
export const useIsAuthenticated = (): boolean => {
  const { isAuthenticated, isLoading } = useAuth();
  return isAuthenticated && !isLoading;
};

// Custom hook for current user
export const useCurrentUser = (): User | null => {
  const { user, isLoading } = useAuth();
  return isLoading ? null : user;
};

// Custom hook for auth loading state
export const useAuthLoading = (): boolean => {
  const { isLoading } = useAuth();
  return isLoading;
};