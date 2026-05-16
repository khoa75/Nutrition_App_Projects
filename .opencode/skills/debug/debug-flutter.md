---
name: debug-flutter
description: Flutter mobile app debugging patterns, common issues, and resolution workflows
license: Apache-2.0
compatibility: opencode
---

## 1. Debug Workflow

```
1. Reproduce the issue on device/emulator
2. Check Flutter DevTools for widget tree and performance
3. Inspect Riverpod state with ProviderScope inspector
4. Review Dio network logs for API failures
5. Check console for exceptions and stack traces
6. Write a failing test, fix, verify
```

## 2. Common Issues & Solutions

### App Won't Start
```bash
# Clean and rebuild
flutter clean && flutter pub get
flutter run --verbose

# Check for platform-specific issues
flutter doctor -v

# Check Android/iOS build config
cd android && ./gradlew clean && cd ..
cd ios && pod install && cd ..
```

### Riverpod State Not Updating
```dart
// ❌ WRONG: Reading provider without listening
final state = ref.read(myProvider);

// ✅ CORRECT: Use watch for rebuilds
final state = ref.watch(myProvider);

// ✅ CORRECT: Use read for one-time actions (button taps)
ref.read(myProvider.notifier).doSomething();
```

### Dio Network Errors
```dart
// Enable Dio logging
dio.interceptors.add(LogInterceptor(
  requestBody: true,
  responseBody: true,
  error: true,
));

// Common error handling
try {
  final response = await dio.get('/api/endpoint');
} on DioException catch (e) {
  switch (e.type) {
    case DioExceptionType.connectionTimeout:
      // Show retry snackbar
    case DioExceptionType.badResponse:
      // Handle 401 (refresh token), 404, 500
    case DioExceptionType.cancel:
      // User cancelled request
  }
}
```

### Widget Not Rebuilding
```dart
// ❌ WRONG: Using StatefulWidget with external state
class MyWidget extends StatefulWidget { ... }

// ✅ CORRECT: Use ConsumerWidget with Riverpod
class MyWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final data = ref.watch(myProvider);
    return Text(data.value);
  }
}
```

### Hot Reload Not Working
- Hot reload doesn't work for: `main()`, `initState()`, global variables, enum changes
- Use **hot restart** (Shift+R) for structural changes
- Full rebuild needed for: platform channel changes, pubspec updates

## 3. Flutter DevTools

```bash
# Open DevTools
flutter pub global activate devtools
flutter pub global run devtools

# Or from flutter run
# Press 'v' to open DevTools in browser
```

**Key panels:**
- **Widget Inspector**: Widget tree, select widget on screen
- **Performance**: Frame rendering, jank detection
- **Network**: HTTP request/response inspection
- **Provider**: Riverpod state inspection

## 4. Debugging Riverpod

```dart
// Enable provider observation
final container = ProviderContainer(
  observers: [
    ProviderObserver(
      didUpdateProvider: (provider, previous, next, container) {
        print('[Provider] $provider: $previous → $next');
      },
    ),
  ],
);

// Debug async providers
final myProvider = FutureProvider((ref) async {
  print('Fetching data...');
  final result = await api.getData();
  print('Data received: ${result.length} items');
  return result;
});
```

## 5. Debugging Navigation (GoRouter)

```dart
// Enable route logging
final router = GoRouter(
  debugLogDiagnostics: true,
  routes: [...],
);

// Common issues:
// - Route not found: Check path matches exactly
// - Params not passing: Use :paramName in path
// - Nested routes: Ensure parent route has children
```

## 6. Memory Leaks

```dart
// ❌ WRONG: Not disposing controllers
class MyWidget extends ConsumerStatefulWidget {
  @override
  void dispose() {
    // Missing: _controller.dispose()
    super.dispose();
  }
}

// ✅ CORRECT: Dispose in dispose()
@override
void dispose() {
  _controller.dispose();
  _scrollController.dispose();
  super.dispose();
}

// Use flutter run --profile and check DevTools Memory tab
```

## 7. Platform-Specific Debugging

### Android
```bash
# View Android logs
adb logcat | grep flutter

# Debug native Android code
flutter run --android-project-path android
# Open android/ in Android Studio
```

### iOS
```bash
# View iOS logs
flutter run --verbose

# Debug native iOS code
open ios/Runner.xcworkspace
# Use Xcode debugger
```

## 8. Quick Debug Checklist

- [ ] `flutter doctor` shows no issues
- [ ] `flutter pub get` succeeds
- [ ] No unhandled exceptions in console
- [ ] Riverpod providers are properly scoped
- [ ] Dio interceptors attached correctly
- [ ] Widget tree uses Consumer/ConsumerWidget where needed
- [ ] Controllers disposed in `dispose()`
- [ ] Navigation routes match expected paths
