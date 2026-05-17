import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class ApiClient {
  late final Dio _dio;
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  static const String _accessTokenKey = 'access_token';
  static const String _refreshTokenKey = 'refresh_token';

  ApiClient({String? baseUrl}) {
    _dio = Dio(
      BaseOptions(
        baseUrl: baseUrl ?? 'http://10.0.2.2:8080/api/v1',
        connectTimeout: const Duration(seconds: 10),
        receiveTimeout: const Duration(seconds: 10),
        headers: {'Content-Type': 'application/json'},
      ),
    );

    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          final token = await _storage.read(key: _accessTokenKey);
          if (token != null) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          handler.next(options);
        },
        onError: (error, handler) async {
          if (error.response?.statusCode == 401) {
            final refreshed = await _tryRefreshToken();
            if (refreshed) {
              final retryResponse = await _retry(error.requestOptions);
              handler.resolve(retryResponse);
              return;
            }
          }
          handler.next(error);
        },
      ),
    );
  }

  Future<bool> _tryRefreshToken() async {
    try {
      final refreshToken = await _storage.read(key: _refreshTokenKey);
      if (refreshToken == null) return false;

      final response = await Dio().post(
        '${_dio.options.baseUrl}/auth/refresh',
        data: {'refreshToken': refreshToken},
      );

      final newToken = response.data['data']['accessToken'] as String;
      final newRefresh = response.data['data']['refreshToken'] as String;

      await _storage.write(key: _accessTokenKey, value: newToken);
      await _storage.write(key: _refreshTokenKey, value: newRefresh);

      return true;
    } catch (_) {
      await _storage.deleteAll();
      return false;
    }
  }

  Future<Response> _retry(RequestOptions requestOptions) async {
    final token = await _storage.read(key: _accessTokenKey);
    requestOptions.headers['Authorization'] = 'Bearer $token';
    return _dio.fetch(requestOptions);
  }

  // ── Auth API ──────────────────────────────────────────────────────────

  Future<Response> login(String email, String password) {
    return _dio.post('/auth/login', data: {
      'email': email,
      'password': password,
    });
  }

  Future<Response> register(String email, String password, String fullName) {
    return _dio.post('/auth/register', data: {
      'email': email,
      'password': password,
      'fullName': fullName,
    });
  }

  Future<Response> refreshToken(String refreshToken) {
    return _dio.post('/auth/refresh', data: {
      'refreshToken': refreshToken,
    });
  }

  // ── Token management ─────────────────────────────────────────────────

  Future<void> saveTokens({
    required String accessToken,
    required String refreshToken,
  }) async {
    await _storage.write(key: _accessTokenKey, value: accessToken);
    await _storage.write(key: _refreshTokenKey, value: refreshToken);
  }

  Future<void> clearTokens() async {
    await _storage.deleteAll();
  }

  Future<String?> get accessToken => _storage.read(key: _accessTokenKey);
  Future<bool> get isLoggedIn => accessToken.then((t) => t != null);
}
