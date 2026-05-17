import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

enum SocialProvider { google, facebook, apple }

class SocialLoginButton extends StatelessWidget {
  final SocialProvider provider;
  final VoidCallback? onPressed;

  const SocialLoginButton({
    super.key,
    required this.provider,
    this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    final config = _getConfig(provider);

    return Container(
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.glassBorder),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.03),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onPressed,
          borderRadius: BorderRadius.circular(16),
          child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: 24,
              vertical: 16,
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  config.icon,
                  color: config.iconColor,
                  size: 24,
                ),
                const SizedBox(width: 12),
                Text(
                  config.label,
                  style: interTextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                    color: AppColors.textPrimary,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  _SocialConfig _getConfig(SocialProvider provider) {
    switch (provider) {
      case SocialProvider.google:
        return _SocialConfig(
          icon: Icons.g_mobiledata_rounded,
          iconColor: const Color(0xFFDB4437),
          label: 'Continue with Google',
        );
      case SocialProvider.facebook:
        return _SocialConfig(
          icon: Icons.facebook_rounded,
          iconColor: const Color(0xFF1877F2),
          label: 'Continue with Facebook',
        );
      case SocialProvider.apple:
        return _SocialConfig(
          icon: Icons.apple_rounded,
          iconColor: Colors.black,
          label: 'Continue with Apple',
        );
    }
  }
}

class _SocialConfig {
  final IconData icon;
  final Color iconColor;
  final String label;

  const _SocialConfig({
    required this.icon,
    required this.iconColor,
    required this.label,
  });
}
