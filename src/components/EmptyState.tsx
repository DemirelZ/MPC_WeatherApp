import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, radius } from '../theme/constants';

interface Props {
  onOpen: () => void;
  accent: string;
}

export default function EmptyState({ onOpen, accent }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🌤️</Text>
      <Text style={styles.title}>No city selected</Text>
      <Text style={styles.subtitle}>
        Tap the button below to search for a city and see the current weather.
      </Text>
      <TouchableOpacity
        onPress={onOpen}
        accessibilityLabel="Open search"
        style={[styles.cta, { backgroundColor: accent }]}
      >
        <Text style={styles.ctaText}>Search city</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  emoji: { fontSize: 48, marginBottom: spacing.md },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  cta: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
  ctaText: { color: '#fff', fontWeight: '800' },
});
