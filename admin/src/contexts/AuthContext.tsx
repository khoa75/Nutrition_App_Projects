import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { adminAuthService, AdminUser, LoginResponse } from '../services/adminAuthService';

interface AuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string; rememberMe?: boolean }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on app start
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      
      if (adminAuthService.isAuthenticated()) {
        setIsAuthenticated(true);
        // Get user profile
        try {
          const userProfile = await adminAuthService.getCurrentUser();
          setUser(userProfile);
        } catch (error) {
          console.error('Failed to get user profile:', error);
          // Tokens might be invalid, clear them
          await adminAuthService.clearAuth();
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

  const login = async (credentials: { email: string; password: string; rememberMe?: boolean }) => {
    try {
      setIsLoading(true);
      const authResponse: LoginResponse = await adminAuthService.login(credentials);
      setUser(authResponse.user);
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
      await adminAuthService.logout();
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
        const userProfile = await adminAuthService.getCurrentUser();
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
export const useCurrentUser = (): AdminUser | null => {
  const { user, isLoading } = useAuth();
  return isLoading ? null : user;
};

// Custom hook for auth loading state
export const useAuthLoading = (): boolean => {
  const { isLoading } = useAuth();
  return isLoading;
};

// Custom hook for admin permissions
export const useAdminPermissions = (): boolean => {
  const { user } = useAuth();
  return user?.role === 'ADMIN';
};

// Custom hook for protecting admin routes
export const useAdminRoute = () => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return { allowed: false, reason: 'not_authenticated' };
  }
  
  if (user?.role !== 'ADMIN') {
    return { allowed: false, reason: 'not_admin' };
  }
  
  return { allowed: true, reason: 'allowed' };
};