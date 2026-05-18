import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:nutrition_app/core/network/api_client.dart';
import 'package:nutrition_app/modules/auth/controllers/auth_controller.dart';
import 'package:nutrition_app/modules/auth/screens/login_screen.dart';

import '../../helpers/fake_api_client.dart';

/// Helper to pump [LoginScreen] wrapped in a [ProviderScope] with test overrides.
Future<void> pumpLoginScreen(WidgetTester tester,
    {FakeApiClient? apiClient}) async {
  final client = apiClient ?? FakeApiClient();
  await tester.pumpWidget(
    ProviderScope(
      overrides: [
        apiClientProvider.overrideWithValue(client),
      ],
      child: const MaterialApp(home: LoginScreen()),
    ),
  );
}

void main() {
  late FakeApiClient fakeApiClient;

  setUp(() {
    fakeApiClient = FakeApiClient();
  });

  group('LoginScreen — rendering', () {
    testWidgets('renders logo, heading, and form fields', (tester) async {
      await pumpLoginScreen(tester, apiClient: fakeApiClient);

      expect(find.byIcon(Icons.restaurant_menu_rounded), findsOneWidget);
      expect(find.text('Welcome Back'), findsOneWidget);
      expect(
        find.text('Log in to continue your nutrition journey'),
        findsOneWidget,
      );

      // Form fields via hint text
      expect(find.text('Email'), findsWidgets);
      expect(find.text('Password'), findsWidgets);

      // Buttons
      expect(find.text('Log In'), findsWidgets); // heading + button
      expect(find.text("Don't have an account? "), findsOneWidget);
      expect(find.text('Sign Up'), findsOneWidget);

      // Social
      expect(find.text('Continue with Google'), findsOneWidget);
      expect(find.text('Continue with Facebook'), findsOneWidget);
      expect(find.text('Continue with Apple'), findsOneWidget);
    });

    testWidgets('renders remember me checkbox unchecked by default',
        (tester) async {
      await pumpLoginScreen(tester, apiClient: fakeApiClient);

      expect(find.text('Remember me'), findsOneWidget);
      final checkbox = tester.widget<Checkbox>(find.byType(Checkbox));
      expect(checkbox.value, false);
    });
  });

  group('LoginScreen — form validation', () {
    testWidgets('shows errors when submitting with empty fields',
        (tester) async {
      await pumpLoginScreen(tester, apiClient: fakeApiClient);

      // Scroll down to make "Log In" button visible
      await tester.drag(find.byType(SingleChildScrollView), const Offset(0, -300));
      await tester.pumpAndSettle();

      await tester.tap(find.text('Log In').last);
      await tester.pumpAndSettle();

      expect(find.text('Email is required'), findsOneWidget);
      expect(find.text('Password is required'), findsOneWidget);
    });

    testWidgets('shows error for invalid email format', (tester) async {
      await pumpLoginScreen(tester, apiClient: fakeApiClient);

      final emailFields = find.byType(TextFormField);
      await tester.enterText(emailFields.first, 'not-an-email');

      await tester.drag(find.byType(SingleChildScrollView), const Offset(0, -300));
      await tester.pumpAndSettle();

      await tester.tap(find.text('Log In').last);
      await tester.pumpAndSettle();

      expect(find.text('Enter a valid email address'), findsOneWidget);
    });
  });

  group('LoginScreen — error state', () {
    testWidgets('shows error banner when login fails', (tester) async {
      fakeApiClient.loginShouldFail = true;
      fakeApiClient.errorMessage = 'Invalid credentials';
      await pumpLoginScreen(tester, apiClient: fakeApiClient);

      final fields = find.byType(TextFormField);
      await tester.enterText(fields.first, 'user@example.com');
      await tester.enterText(fields.last, 'ValidP@ss1');

      await tester.drag(find.byType(SingleChildScrollView), const Offset(0, -300));
      await tester.pumpAndSettle();

      await tester.tap(find.text('Log In').last);
      await tester.pumpAndSettle();

      expect(find.text('Invalid credentials'), findsOneWidget);
      expect(find.byIcon(Icons.error_outline), findsOneWidget);
    });
  });

  group('LoginScreen — navigation', () {
    testWidgets('tapping Sign Up navigates to RegisterScreen',
        (tester) async {
      await pumpLoginScreen(tester, apiClient: fakeApiClient);

      await tester.drag(find.byType(SingleChildScrollView), const Offset(0, -500));
      await tester.pumpAndSettle();

      await tester.tap(find.text('Sign Up'));
      await tester.pumpAndSettle();

      expect(find.text('Create Account'), findsWidgets);
    });
  });

  group('LoginScreen — password visibility toggle', () {
    testWidgets('toggles password visibility icon', (tester) async {
      await pumpLoginScreen(tester, apiClient: fakeApiClient);

      // Initially shows visibility_off icon (password hidden)
      expect(find.byIcon(Icons.visibility_off_outlined), findsOneWidget);
      expect(find.byIcon(Icons.visibility_outlined), findsNothing);

      // Tap to show password
      await tester.tap(find.byIcon(Icons.visibility_off_outlined));
      await tester.pump();

      // Now shows visibility icon (password visible)
      expect(find.byIcon(Icons.visibility_outlined), findsOneWidget);
      expect(find.byIcon(Icons.visibility_off_outlined), findsNothing);
    });
  });
}
