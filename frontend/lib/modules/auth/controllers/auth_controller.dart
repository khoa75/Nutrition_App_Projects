import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:dio/dio.dart';
import '../../../core/network/api_client.dart';
import '../models/auth_models.dart';

// ── API client provider ─────────────────────────────────────────────────

final apiClientProvider = Provider<ApiClient>((ref) {
  return ApiClient();
});

// ── Auth state ──────────────────────────────────────────────────────────

enum AuthStatus { idle, loading, success, error }

class AuthState {
  final AuthStatus status;
  final String? errorMessage;
  final TokenResponse? tokenResponse;

  const AuthState({
    this.status = AuthStatus.idle,
    this.errorMessage,
    this.tokenResponse,
  });

  AuthState copyWith({
    AuthStatus? status,
    String? errorMessage,
    TokenResponse? tokenResponse,
  }) {
    return AuthState(
      status: status ?? this.status,
      errorMessage: errorMessage,
      tokenResponse: tokenResponse ?? this.tokenResponse,
    );
  }

  bool get isLoggedIn => tokenResponse != null;
}

// ── Auth controller ────────────────────────────────────────────────────

class AuthController extends StateNotifier<AuthState> {
  final ApiClient _apiClient;

  AuthController(this._apiClient) : super(const AuthState());

  Future<void> login({
    required String email,
    required String password,
  }) async {
    state = state.copyWith(status: AuthStatus.loading, errorMessage: null);
    try {
      final response = await _apiClient.login(email, password);

      // Backend wraps in ApiResponse envelope
      final data = response.data;
      final tokenJson = data is Map<String, dynamic> && data.containsKey('data')
          ? data['data'] as Map<String, dynamic>
          : data as Map<String, dynamic>;

      final tokenResponse = TokenResponse.fromJson(tokenJson);

      await _apiClient.saveTokens(
        accessToken: tokenResponse.accessToken,
        refreshToken: tokenResponse.refreshToken,
      );

      state = state.copyWith(
        status: AuthStatus.success,
        tokenResponse: tokenResponse,
        errorMessage: null,
      );
    } on DioException catch (e) {
      final message = _extractError(e);
      state = state.copyWith(
        status: AuthStatus.error,
        errorMessage: message,
      );
    } catch (e) {
      state = state.copyWith(
        status: AuthStatus.error,
        errorMessage: 'An unexpected error occurred',
      );
    }
  }

  Future<void> register({
    required String email,
    required String password,
    required String fullName,
  }) async {
    state = state.copyWith(status: AuthStatus.loading, errorMessage: null);
    try {
      final response = await _apiClient.register(email, password, fullName);

      final data = response.data;
      final tokenJson = data is Map<String, dynamic> && data.containsKey('data')
          ? data['data'] as Map<String, dynamic>
          : data as Map<String, dynamic>;

      final tokenResponse = TokenResponse.fromJson(tokenJson);

      await _apiClient.saveTokens(
        accessToken: tokenResponse.accessToken,
        refreshToken: tokenResponse.refreshToken,
      );

      state = state.copyWith(
        status: AuthStatus.success,
        tokenResponse: tokenResponse,
        errorMessage: null,
      );
    } on DioException catch (e) {
      final message = _extractError(e);
      state = state.copyWith(
        status: AuthStatus.error,
        errorMessage: message,
      );
    } catch (e) {
      state = state.copyWith(
        status: AuthStatus.error,
        errorMessage: 'An unexpected error occurred',
      );
    }
  }

  void resetState() {
    state = const AuthState();
  }

  String _extractError(DioException e) {
    if (e.response?.data is Map) {
      final data = e.response!.data as Map;
      if (data.containsKey('message')) {
        return data['message'] as String;
      }
    }
    switch (e.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.receiveTimeout:
        return 'Connection timed out. Please try again.';
      case DioExceptionType.connectionError:
        return 'Unable to connect. Check your internet connection.';
      default:
        return 'Something went wrong. Please try again.';
    }
  }
}

final authControllerProvider =
    StateNotifierProvider<AuthController, AuthState>((ref) {
  final apiClient = ref.watch(apiClientProvider);
  return AuthController(apiClient);
});
