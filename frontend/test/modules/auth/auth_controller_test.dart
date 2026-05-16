import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:nutrition_app/core/network/api_client.dart';
import 'package:nutrition_app/modules/auth/controllers/auth_controller.dart';
import 'package:nutrition_app/modules/auth/models/auth_models.dart';

import '../../helpers/fake_api_client.dart';

void main() {
  late FakeApiClient fakeApiClient;
  late ProviderContainer container;
  late AuthController controller;

  setUp(() {
    fakeApiClient = FakeApiClient();
    container = ProviderContainer(
      overrides: [
        apiClientProvider.overrideWithValue(fakeApiClient),
      ],
    );
    controller = container.read(authControllerProvider.notifier);
  });

  tearDown(() {
    container.dispose();
  });

  group('AuthController — initial state', () {
    test('starts with idle status and no token', () {
      final state = container.read(authControllerProvider);
      expect(state.status, AuthStatus.idle);
      expect(state.tokenResponse, isNull);
      expect(state.errorMessage, isNull);
      expect(state.isLoggedIn, false);
    });

    test('resetState returns to idle', () {
      controller.resetState();
      final state = container.read(authControllerProvider);
      expect(state.status, AuthStatus.idle);
      expect(state.tokenResponse, isNull);
      expect(state.errorMessage, isNull);
    });
  });

  group('AuthController — login', () {
    test('transitions through loading on valid credentials', () async {
      controller.login(
        email: 'test@example.com',
        password: 'ValidP@ss1',
      );

      expect(container.read(authControllerProvider).status, AuthStatus.loading);

      await Future.delayed(Duration.zero);

      final state = container.read(authControllerProvider);
      expect(state.status, AuthStatus.success);
      expect(state.isLoggedIn, true);
    });

    test('shows error message on invalid credentials', () async {
      fakeApiClient.loginShouldFail = true;
      fakeApiClient.errorMessage = 'Invalid credentials';

      controller.login(
        email: 'wrong@example.com',
        password: 'wrong',
      );

      await Future.delayed(Duration.zero);

      final state = container.read(authControllerProvider);
      expect(state.status, AuthStatus.error);
      expect(state.errorMessage, 'Invalid credentials');
      expect(state.isLoggedIn, false);
    });
  });

  group('AuthController — register', () {
    test('transitions through loading on valid registration', () async {
      controller.register(
        email: 'new@example.com',
        password: 'ValidP@ss1',
        fullName: 'New User',
      );

      expect(container.read(authControllerProvider).status, AuthStatus.loading);

      await Future.delayed(Duration.zero);

      final state = container.read(authControllerProvider);
      expect(state.status, AuthStatus.success);
      expect(state.isLoggedIn, true);
    });

    test('shows error when registration fails', () async {
      fakeApiClient.registerShouldFail = true;
      fakeApiClient.errorMessage = 'Email already registered';

      controller.register(
        email: 'existing@example.com',
        password: 'ValidP@ss1',
        fullName: 'Existing User',
      );

      await Future.delayed(Duration.zero);

      final state = container.read(authControllerProvider);
      expect(state.status, AuthStatus.error);
      expect(state.errorMessage, 'Email already registered');
    });
  });

  group('AuthController — model parsing', () {
    test('TokenResponse parses correctly from JSON', () {
      final json = {
        'accessToken': 'abc123',
        'refreshToken': 'def456',
        'tokenType': 'Bearer',
        'expiresIn': 86400,
        'user': {
          'id': 'user-1',
          'email': 'a@b.com',
          'fullName': 'Alice',
          'role': 'USER',
        },
      };

      final token = TokenResponse.fromJson(json);
      expect(token.accessToken, 'abc123');
      expect(token.user.email, 'a@b.com');
      expect(token.user.role, 'USER');
    });

    test('UserInfo defaults role to USER when absent', () {
      final json = {
        'id': 'x',
        'email': 'x@y.com',
        'fullName': 'X',
      };
      final user = UserInfo.fromJson(json);
      expect(user.role, 'USER');
    });

    test('TokenResponse round-trips through JSON', () {
      final original = FakeApiClient.defaultTokenResponse;
      final json = original.toJson();
      final restored = TokenResponse.fromJson(json);
      expect(restored.accessToken, original.accessToken);
      expect(restored.user.email, original.user.email);
    });
  });
}
