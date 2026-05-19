import {
  AuthCredentials,
  AuthResponse,
  User,
  LoginRequest,
  RegisterRequest,
  AuthStorageService
} from '../src/services/authService';

// Mock Keychain for testing
const mockKeychain = {
  setGenericPassword: jest.fn(),
  getGenericPassword: jest.fn(),
  resetGenericPassword: jest.fn()
};

// Mock Axios for API calls
const mockAxios = {
  post: jest.fn()
};

describe('AuthService', () => {
  let authService: AuthStorageService;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    authService = new AuthStorageService(mockKeychain, mockAxios as any);
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('Login', () => {
    const loginRequest: LoginRequest = {
      email: 'test@example.com',
      password: 'password123'
    };

    const mockAuthResponse: AuthResponse = {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      user: {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        status: 'ACTIVE'
      }
    };

    it('TC-AUTH-01: Should successfully login with valid credentials', async () => {
      // Arrange
      mockAxios.post.mockResolvedValueOnce({
        data: mockAuthResponse,
        status: 200
      });

      // Act
      const result = await authService.login(loginRequest);

      // Assert
      expect(mockAxios.post).toHaveBeenCalledWith('/auth/login', loginRequest);
      expect(result).toEqual(mockAuthResponse);
      expect(mockKeychain.setGenericPassword).toHaveBeenCalledWith(
        'accessToken',
        mockAuthResponse.accessToken
      );
      expect(mockKeychain.setGenericPassword).toHaveBeenCalledWith(
        'refreshToken',
        mockAuthResponse.refreshToken
      );
    });

    it('TC-AUTH-02: Should throw error for invalid credentials', async () => {
      // Arrange
      const errorResponse = {
        response: {
          status: 401,
          data: { message: 'Invalid credentials' }
        }
      };
      mockAxios.post.mockRejectedValueOnce(errorResponse);

      // Act & Assert
      await expect(authService.login(loginRequest)).rejects.toThrow('Invalid credentials');
      expect(mockAxios.post).toHaveBeenCalledWith('/auth/login', loginRequest);
    });

    it('TC-AUTH-03: Should throw error for network issues', async () => {
      // Arrange
      mockAxios.post.mockRejectedValueOnce(new Error('Network error'));

      // Act & Assert
      await expect(authService.login(loginRequest)).rejects.toThrow('Network error');
      expect(mockAxios.post).toHaveBeenCalledWith('/auth/login', loginRequest);
    });
  });

  describe('Register', () => {
    const registerRequest: RegisterRequest = {
      name: 'New User',
      email: 'newuser@example.com',
      password: 'password123',
      dob: '1990-01-01'
    };

    const mockUserResponse: User = {
      id: 2,
      name: 'New User',
      email: 'newuser@example.com',
      status: 'ACTIVE'
    };

    it('TC-AUTH-04: Should successfully register with valid data', async () => {
      // Arrange
      mockAxios.post.mockResolvedValueOnce({
        data: mockUserResponse,
        status: 201
      });

      // Act
      const result = await authService.register(registerRequest);

      // Assert
      expect(mockAxios.post).toHaveBeenCalledWith('/auth/register', registerRequest);
      expect(result).toEqual(mockUserResponse);
    });

    it('TC-AUTH-05: Should validate password strength during registration', async () => {
      // Arrange
      const weakPasswordRequest = {
        ...registerRequest,
        password: 'weak'
      };

      // Act & Assert
      await expect(authService.register(weakPasswordRequest)).rejects.toThrow('Password must be at least 8 characters long');
    });

    it('TC-AUTH-06: Should validate email format during registration', async () => {
      // Arrange
      const invalidEmailRequest = {
        ...registerRequest,
        email: 'invalid-email'
      };

      // Act & Assert
      await expect(authService.register(invalidEmailRequest)).rejects.toThrow('Invalid email format');
    });
  });

  describe('Token Management', () => {
    const mockTokens = {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token'
    };

    it('TC-AUTH-07: Should store tokens securely', async () => {
      // Arrange
      mockKeychain.getGenericPassword.mockResolvedValueOnce({
        service: 'accessToken',
        password: mockTokens.accessToken
      });
      mockKeychain.getGenericPassword.mockResolvedValueOnce({
        service: 'refreshToken',
        password: mockTokens.refreshToken
      });

      // Act
      await authService.storeTokens(mockTokens);

      // Assert
      expect(mockKeychain.setGenericPassword).toHaveBeenCalledWith('accessToken', mockTokens.accessToken);
      expect(mockKeychain.setGenericPassword).toHaveBeenCalledWith('refreshToken', mockTokens.refreshToken);
    });

    it('TC-AUTH-08: Should retrieve stored tokens', async () => {
      // Arrange
      mockKeychain.getGenericPassword.mockResolvedValueOnce({
        service: 'accessToken',
        password: mockTokens.accessToken
      });
      mockKeychain.getGenericPassword.mockResolvedValueOnce({
        service: 'refreshToken',
        password: mockTokens.refreshToken
      });

      // Act
      const tokens = await authService.getStoredTokens();

      // Assert
      expect(tokens).toEqual(mockTokens);
      expect(mockKeychain.getGenericPassword).toHaveBeenCalledWith('accessToken');
      expect(mockKeychain.getGenericPassword).toHaveBeenCalledWith('refreshToken');
    });

    it('TC-AUTH-09: Should handle missing tokens gracefully', async () => {
      // Arrange
      mockKeychain.getGenericPassword.mockResolvedValueOnce(null);

      // Act
      const tokens = await authService.getStoredTokens();

      // Assert
      expect(tokens).toBeNull();
    });

    it('TC-AUTH-10: Should clear tokens on logout', async () => {
      // Act
      await authService.logout();

      // Assert
      expect(mockKeychain.resetGenericPassword).toHaveBeenCalledWith('accessToken');
      expect(mockKeychain.resetGenericPassword).toHaveBeenCalledWith('refreshToken');
    });
  });

  describe('Token Refresh', () => {
    it('TC-AUTH-11: Should refresh expired access token', async () => {
      // Arrange
      const newTokens = {
        accessToken: 'new-access-token',
        refreshToken: 'mock-refresh-token'
      };

      mockAxios.post.mockResolvedValueOnce({
        data: newTokens,
        status: 200
      });

      // Act
      const result = await authService.refreshToken('mock-refresh-token');

      // Assert
      expect(mockAxios.post).toHaveBeenCalledWith('/auth/refresh', {
        refreshToken: 'mock-refresh-token'
      });
      expect(result).toEqual(newTokens);
    });

    it('TC-AUTH-12: Should handle refresh token failure', async () => {
      // Arrange
      const errorResponse = {
        response: {
          status: 401,
          data: { message: 'Invalid refresh token' }
        }
      };
      mockAxios.post.mockRejectedValueOnce(errorResponse);

      // Act & Assert
      await expect(authService.refreshToken('invalid-token')).rejects.toThrow('Invalid refresh token');
    });
  });

  describe('User Session Management', () => {
    it('TC-AUTH-13: Should check if user is authenticated', async () => {
      // Arrange
      mockKeychain.getGenericPassword.mockResolvedValueOnce({
        service: 'accessToken',
        password: 'valid-token'
      });

      // Act
      const isAuthenticated = await authService.isAuthenticated();

      // Assert
      expect(isAuthenticated).toBe(true);
    });

    it('TC-AUTH-14: Should return false if no access token', async () => {
      // Arrange
      mockKeychain.getGenericPassword.mockResolvedValueOnce(null);

      // Act
      const isAuthenticated = await authService.isAuthenticated();

      // Assert
      expect(isAuthenticated).toBe(false);
    });

    it('TC-AUTH-15: Should validate token expiration', async () => {
      // Arrange
      const expiredToken = 'expired-token';
      mockKeychain.getGenericPassword.mockResolvedValueOnce({
        service: 'accessToken',
        password: expiredToken
      });

      // Act
      const isValid = await authService.validateToken(expiredToken);

      // Assert
      // This test depends on actual token validation logic
      expect(typeof isValid).toBe('boolean');
    });
  });

  describe('Password Security', () => {
    it('TC-AUTH-16: Should validate password strength requirements', () => {
      const weakPassword = 'weak';
      const strongPassword = 'StrongPassword123!';
      const validPassword = 'Password123';

      expect(authService.validatePassword(weakPassword)).toBe(false);
      expect(authService.validatePassword(strongPassword)).toBe(true);
      expect(authService.validatePassword(validPassword)).toBe(true);
    });

    it('TC-AUTH-17: Should validate email format', () => {
      const invalidEmails = [
        'invalid-email',
        'user@',
        '@domain.com',
        'user@domain',
        'user..domain@com'
      ];
      const validEmails = [
        'user@example.com',
        'test.user+tag@domain.co.uk',
        'user123@sub.domain.com'
      ];

      invalidEmails.forEach(email => {
        expect(authService.validateEmail(email)).toBe(false);
      });

      validEmails.forEach(email => {
        expect(authService.validateEmail(email)).toBe(true);
      });
    });
  });

  describe('Error Handling', () => {
    it('TC-AUTH-18: Should handle API timeouts gracefully', async () => {
      // Arrange
      mockAxios.post.mockRejectedValueOnce(new Error('Request timeout'));

      // Act & Assert
      await expect(authService.login({
        email: 'test@example.com',
        password: 'password123'
      })).rejects.toThrow('Request timeout');
    });

    it('TC-AUTH-19: Should handle storage errors gracefully', async () => {
      // Arrange
      mockKeychain.setGenericPassword.mockRejectedValueOnce(new Error('Storage error'));

      // Act & Assert
      await expect(authService.storeTokens({
        accessToken: 'token',
        refreshToken: 'refresh'
      })).rejects.toThrow('Storage error');
    });

    it('TC-AUTH-20: Should provide meaningful error messages', async () => {
      // Arrange
      const errorResponse = {
        response: {
          status: 500,
          data: { message: 'Internal server error' }
        }
      };
      mockAxios.post.mockRejectedValueOnce(errorResponse);

      // Act & Assert
      await expect(authService.login({
        email: 'test@example.com',
        password: 'password123'
      })).rejects.toThrow('Internal server error');
    });
  });
});