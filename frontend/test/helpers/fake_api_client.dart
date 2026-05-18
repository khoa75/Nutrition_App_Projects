import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:nutrition_app/core/network/api_client.dart';
import 'package:nutrition_app/modules/auth/models/auth_models.dart';

/// A fake [ApiClient] for use in tests.
/// Returns canned responses instead of making real HTTP calls.
class FakeApiClient implements ApiClient {
  bool loginShouldFail = false;
  bool registerShouldFail = false;
  String? errorMessage;
  Duration delay = Duration.zero;

  TokenResponse? _cannedResponse;

  static final defaultTokenResponse = TokenResponse(
    accessToken: 'test-access-token',
    refreshToken: 'test-refresh-token',
    tokenType: 'Bearer',
    expiresIn: 86400,
    user: const UserInfo(
      id: 'test-id',
      email: 'test@example.com',
      fullName: 'Test User',
      role: 'USER',
    ),
  );

  FakeApiClient({TokenResponse? tokenResponse}) {
    _cannedResponse = tokenResponse ?? defaultTokenResponse;
  }

  @override
  Future<Response> login(String email, String password) async {
    await Future.delayed(delay);
    if (loginShouldFail) {
      throw DioException(
        requestOptions: RequestOptions(path: ''),
        response: Response(
          requestOptions: RequestOptions(path: ''),
          statusCode: 400,
          data: {'message': errorMessage ?? 'Invalid credentials'},
        ),
      );
    }
    return _fakeResponse({
      'data': _cannedResponse!.toJson(),
    });
  }

  @override
  Future<Response> register(
      String email, String password, String fullName) async {
    await Future.delayed(delay);
    if (registerShouldFail) {
      throw DioException(
        requestOptions: RequestOptions(path: ''),
        response: Response(
          requestOptions: RequestOptions(path: ''),
          statusCode: 400,
          data: {'message': errorMessage ?? 'Registration failed'},
        ),
      );
    }
    return _fakeResponse({
      'data': _cannedResponse!.toJson(),
    });
  }

  @override
  Future<Response> refreshToken(String refreshToken) async {
    return _fakeResponse({
      'data': _cannedResponse!.toJson(),
    });
  }

  @override
  Future<void> saveTokens({
    required String accessToken,
    required String refreshToken,
  }) async {
    // no-op in tests
  }

  @override
  Future<void> clearTokens() async {
    // no-op in tests
  }

  @override
  Future<String?> get accessToken async => null;

  @override
  Future<bool> get isLoggedIn async => false;

  Response _fakeResponse(Map<String, dynamic> data) {
    return Response(
      requestOptions: RequestOptions(path: ''),
      statusCode: 200,
      data: data,
    );
  }
}

/// Provider override that replaces the real ApiClient with [FakeApiClient].
final fakeApiClientProvider = Provider<ApiClient>((ref) {
  return FakeApiClient();
});
