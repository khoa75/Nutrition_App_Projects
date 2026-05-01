# Skill: Create Flutter UI Component

## Context
This skill provides instructions on how to build a new UI Widget/Screen in the Flutter frontend for the Nutrition App.

## Prerequisites
- Framework: Flutter.
- UI Library: Material / Cupertino.
- State Management: Provider / Riverpod / BLoC (Check current project setup before implementing).

## Steps

1. **Determine Component Scope:**
   - Is it a shared widget (e.g., custom button, card) or a full screen (e.g., Dashboard Screen)?
   - Shared widgets go to `lib/components/` or `lib/widgets/`.
   - Screens go to `lib/pages/` or `lib/screens/`.

2. **Create the Widget:**
   - Use `StatelessWidget` by default. 
   - Use `StatefulWidget` only if local UI state is strictly required and not managed by the global state manager.
   - Separate UI from Business Logic.

3. **State Management Integration:**
   - If using Riverpod: Create a `Provider` or `StateNotifierProvider` in the `lib/store/` directory. Use `ConsumerWidget`.
   - If using BLoC: Create Events and States, wrap with `BlocBuilder`.

4. **Styling:**
   - Stick to the app's predefined Theme (`Theme.of(context)`).
   - Do not hardcode colors or fonts unless explicitly required.

5. **API Integration:**
   - Create API calls in the `lib/services/` directory.
   - Call the service from within the state manager (e.g., Provider/BLoC), not directly from the UI widget.
