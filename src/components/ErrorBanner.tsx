import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../theme/constants';

interface Props {
  message: string;
}

export default function ErrorBanner({ message }: Props) {
  return (
    <View style={styles.container} accessibilityRole="alert">
      <Text style={styles.text}>⚠️ {message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.sm,
    backgroundColor: colors.dangerBg,
    borderWidth: 1,
    borderColor: '#7f1d1d',
    padding: spacing.md,
    borderRadius: radius.lg,
  },
  text: { color: colors.dangerText, fontWeight: '700' },
});
