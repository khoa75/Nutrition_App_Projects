import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:nutrition_app/core/network/api_client.dart';
import 'package:nutrition_app/modules/auth/controllers/auth_controller.dart';
import 'package:nutrition_app/modules/auth/screens/register_screen.dart';

import '../../helpers/fake_api_client.dart';

/// Helper to pump [RegisterScreen] wrapped in a [ProviderScope] with test overrides.
Future<void> pumpRegisterScreen(WidgetTester tester,
    {FakeApiClient? apiClient}) async {
  final client = apiClient ?? FakeApiClient();
  await tester.pumpWidget(
    ProviderScope(
      overrides: [
        apiClientProvider.overrideWithValue(client),
      ],
      child: const MaterialApp(home: RegisterScreen()),
    ),
  );
}

void main() {
  late FakeApiClient fakeApiClient;

  setUp(() {
    fakeApiClient = FakeApiClient();
  });

  group('RegisterScreen — rendering', () {
    testWidgets('renders all form fields and buttons', (tester) async {
      await pumpRegisterScreen(tester, apiClient: fakeApiClient);

      // Heading (only the title — button says "Create Account" too)
      expect(find.text('Start your nutrition journey today'), findsOneWidget);

      // Form field labels
      expect(find.text('Full Name'), findsOneWidget);
      expect(find.text('Email'), findsWidgets);
      expect(find.text('Password'), findsWidgets);
      expect(find.text('Confirm Password'), findsOneWidget);

      // Social login
      expect(find.text('Continue with Google'), findsOneWidget);
      expect(find.text('Continue with Facebook'), findsOneWidget);
      expect(find.text('Continue with Apple'), findsOneWidget);

      // Navigation link
      expect(find.text('Already have an account? '), findsOneWidget);
      expect(find.text('Log In'), findsWidgets);
    });

    testWidgets('renders back button', (tester) async {
      await pumpRegisterScreen(tester, apiClient: fakeApiClient);

      expect(find.byIcon(Icons.arrow_back_rounded), findsOneWidget);
    });
  });

  group('RegisterScreen — form validation', () {
    testWidgets('shows errors when submitting empty form', (tester) async {
      await pumpRegisterScreen(tester, apiClient: fakeApiClient);

      // Scroll down to make button visible
      await tester.drag(find.byType(SingleChildScrollView), const Offset(0, -300));
      await tester.pumpAndSettle();

      // Tap the button (there are 2 "Create Account" texts: heading + button)
      await tester.tap(find.text('Create Account').last);
      await tester.pumpAndSettle();

      expect(find.text('Full name is required'), findsOneWidget);
      expect(find.text('Email is required'), findsOneWidget);
      expect(find.text('Password is required'), findsOneWidget);
      expect(find.text('Please confirm your password'), findsOneWidget);
    });

    testWidgets('validates email format', (tester) async {
      await pumpRegisterScreen(tester, apiClient: fakeApiClient);

      final fields = find.byType(TextFormField);
      await tester.enterText(fields.at(0), 'Test User');    // Full Name
      await tester.enterText(fields.at(1), 'bad-email');    // Email

      await tester.drag(find.byType(SingleChildScrollView), const Offset(0, -300));
      await tester.pumpAndSettle();

      await tester.tap(find.text('Create Account').last);
      await tester.pumpAndSettle();

      expect(find.text('Enter a valid email address'), findsOneWidget);
    });

    testWidgets('validates password minimum length', (tester) async {
      await pumpRegisterScreen(tester, apiClient: fakeApiClient);

      final fields = find.byType(TextFormField);
      await tester.enterText(fields.at(0), 'Test User');
      await tester.enterText(fields.at(1), 'test@example.com');
      await tester.enterText(fields.at(2), 'Sh0rt!');
      await tester.enterText(fields.at(3), 'Sh0rt!');

      await tester.drag(find.byType(SingleChildScrollView), const Offset(0, -300));
      await tester.pumpAndSettle();

      await tester.tap(find.text('Create Account').last);
      await tester.pumpAndSettle();

      expect(
        find.text('Password must be at least 8 characters'),
        findsOneWidget,
      );
    });

    testWidgets('validates password complexity — uppercase required',
        (tester) async {
      await pumpRegisterScreen(tester, apiClient: fakeApiClient);

      final fields = find.byType(TextFormField);
      await tester.enterText(fields.at(2), 'lowercaseonly1!');

      await tester.drag(find.byType(SingleChildScrollView), const Offset(0, -300));
      await tester.pumpAndSettle();

      await tester.tap(find.text('Create Account').last);
      await tester.pumpAndSettle();

      expect(
        find.text('Include at least one uppercase letter'),
        findsOneWidget,
      );
    });

    testWidgets('validates passwords match', (tester) async {
      await pumpRegisterScreen(tester, apiClient: fakeApiClient);

      final fields = find.byType(TextFormField);
      await tester.enterText(fields.at(0), 'Test User');
      await tester.enterText(fields.at(1), 'test@example.com');
      await tester.enterText(fields.at(2), 'ValidP@ss1');
      await tester.enterText(fields.at(3), 'DifferentP@ss1');

      await tester.drag(find.byType(SingleChildScrollView), const Offset(0, -300));
      await tester.pumpAndSettle();

      await tester.tap(find.text('Create Account').last);
      await tester.pumpAndSettle();

      expect(find.text('Passwords do not match'), findsOneWidget);
    });

    testWidgets('requires terms agreement before submission', (tester) async {
      await pumpRegisterScreen(tester, apiClient: fakeApiClient);

      final fields = find.byType(TextFormField);
      await tester.enterText(fields.at(0), 'Test User');
      await tester.enterText(fields.at(1), 'test@example.com');
      await tester.enterText(fields.at(2), 'ValidP@ss1');
      await tester.enterText(fields.at(3), 'ValidP@ss1');

      await tester.drag(find.byType(SingleChildScrollView), const Offset(0, -300));
      await tester.pumpAndSettle();

      await tester.tap(find.text('Create Account').last);
      await tester.pumpAndSettle();

      expect(
        find.text('Please agree to the Terms of Use and Privacy Policy'),
        findsOneWidget,
      );
    });
  });

  group('RegisterScreen — error state', () {
    testWidgets('shows error banner when registration fails', (tester) async {
      fakeApiClient.registerShouldFail = true;
      fakeApiClient.errorMessage = 'Email already registered';
      await pumpRegisterScreen(tester, apiClient: fakeApiClient);

      final fields = find.byType(TextFormField);
      await tester.enterText(fields.at(0), 'Test User');
      await tester.enterText(fields.at(1), 'test@example.com');
      await tester.enterText(fields.at(2), 'ValidP@ss1');
      await tester.enterText(fields.at(3), 'ValidP@ss1');

      // Check terms checkbox — scroll to it first
      await tester.drag(find.byType(SingleChildScrollView), const Offset(0, -200));
      await tester.pumpAndSettle();
      await tester.tap(find.byType(Checkbox));
      await tester.pump();

      // Tap the create account button
      await tester.drag(find.byType(SingleChildScrollView), const Offset(0, -200));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Create Account').last);
      await tester.pumpAndSettle();

      expect(find.text('Email already registered'), findsOneWidget);
    });
  });

  group('RegisterScreen — password strength bar', () {
    testWidgets('shows Weak for simple password', (tester) async {
      await pumpRegisterScreen(tester, apiClient: fakeApiClient);

      final fields = find.byType(TextFormField);
      await tester.enterText(fields.at(2), 'short');
      await tester.pump();

      expect(find.text('Weak'), findsOneWidget);
    });

    testWidgets('shows Strong for complex password', (tester) async {
      await pumpRegisterScreen(tester, apiClient: fakeApiClient);

      final fields = find.byType(TextFormField);
      // Score 3: length >=8, upper+lower, digit+special (but length < 12)
      await tester.enterText(fields.at(2), 'C0mpl3x!');
      await tester.pumpAndSettle();

      expect(find.text('Strong'), findsOneWidget);
    });
  });

  group('RegisterScreen — checkbox toggling', () {
    testWidgets('terms checkbox toggles on tap', (tester) async {
      await pumpRegisterScreen(tester, apiClient: fakeApiClient);

      // Scroll down so the checkbox is visible
      await tester.drag(find.byType(SingleChildScrollView), const Offset(0, -400));
      await tester.pumpAndSettle();

      final checkbox = tester.widget<Checkbox>(find.byType(Checkbox));
      expect(checkbox.value, false);

      await tester.tap(find.byType(Checkbox));
      await tester.pump();

      final checkboxAfter = tester.widget<Checkbox>(find.byType(Checkbox));
      expect(checkboxAfter.value, true);
    });
  });
}
