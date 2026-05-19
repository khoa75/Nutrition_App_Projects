import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';

interface LogoProps {
  size?: 'large' | 'small';
}

const Logo: React.FC<LogoProps> = ({ size = 'large' }) => {
  const isLarge = size === 'large';
  const iconBoxSize = isLarge ? 64 : 40;
  const iconSize = isLarge ? 32 : 22;
  const titleSize = isLarge ? 26 : 20;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconBox,
          {
            width: iconBoxSize,
            height: iconBoxSize,
            borderRadius: isLarge ? 16 : 10,
          },
        ]}
      >
        <Ionicons name="barbell" size={iconSize} color={Colors.textDark} />
      </View>
      <Text style={[styles.title, { fontSize: titleSize }]}>Vitality</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconBox: {
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 0.5,
  },
});

export default Logo;
