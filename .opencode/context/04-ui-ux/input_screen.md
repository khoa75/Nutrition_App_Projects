# US‑1.2 – Initial Health Information Entry (Frontend Spec)

**Purpose**: Capture a new user's basic health data so the app can personalize nutrition plans.

## Screen
- **Widget**: `InitialHealthEntryScreen`
- **Route**: `/initial-health`
- **Base class**: `ConsumerStatefulWidget` (Riverpod) wrapped in a `Scaffold`.

## Layout (Flutter)
| Element | Widget | Key Props |
|---|---|---|
| App bar | `AppBar` | `title: Text('Health Information')` |
| Form container | `Form` + `ListView` | `key: _formKey` |
| Full name | `TextFormField` | `labelText: 'Full Name'`, `validator: required` |
| Date of birth | Read‑only `TextFormField` + `showDatePicker` | `labelText: 'Date of Birth (YYYY‑MM‑DD)'`, `onTap` opens picker |
| Weight (kg) | `TextFormField` (numeric) | `labelText: 'Weight (kg)'`, `keyboardType: number`, `onChanged: _calculateBmi` |
| Height (cm) | `TextFormField` (numeric) | `labelText: 'Height (cm)'`, `keyboardType: number`, `onChanged: _calculateBmi` |
| Gender | `DropdownButtonFormField<String>` | Options: **Male**, **Female**, **Other**; default **Male** |
| Exercise intensity | `DropdownButtonFormField<String>` | Options: **Low**, **Moderate**, **High**; default **Moderate** |
| Weight goal (kg) | `TextFormField` (numeric) | `labelText: 'Weight Goal (kg)'`, `validator: required` |
| BMI display | `Text` (conditional) | Shown only when `_bmi != null`; format `Current BMI: xx.xx` |
| Save button | `ElevatedButton` | `onPressed` validates form, calls provider to POST data, shows `SnackBar('Health information saved')` |

## Interaction Flow
1. User enters/updates **weight** or **height** → `_calculateBmi()` recomputes BMI and updates UI instantly.
2. Press **Save** → form validation runs; if any required field is empty, inline error appears.
3. On successful validation, the screen invokes a Riverpod provider (e.g., `healthInfoProvider`) that sends a JSON payload to the backend endpoint `/api/v1/user/health` over HTTPS.
4. After the provider confirms success, a `SnackBar` notifies the user and navigation to the next onboarding step can be triggered by the caller.

## Styling (follow app theme)
- Use the global **Mint** palette.
- Input fields: rounded corners, `EdgeInsets.symmetric(horizontal: 16, vertical: 8)`.
- Vertical spacing: `SizedBox(height: 20)` between groups, `SizedBox(height: 12)` between fields.
- BMI text uses `Theme.of(context).textTheme.headline6`.

## Dependencies
```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
```

## Notes for Developers
- The screen only handles UI and basic validation; secure storage is delegated to the provider layer.
- Ensure the provider includes the current auth token when posting data.
- The widget should be added to the app’s router configuration under the path `/initial-health`.
