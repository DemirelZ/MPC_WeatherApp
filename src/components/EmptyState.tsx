// EmptyState: shown when there is no selected city/result yet
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, spacing, radius } from '../theme/constants';

interface Props {
  onOpen: () => void;
}

export default function EmptyState({ onOpen }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/image1.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.title}>No city selected</Text>
      <Text style={styles.subtitle}>
        Tap the button below to search for a city and see the current weather.
      </Text>
      <TouchableOpacity
        onPress={onOpen}
        accessibilityLabel="Open search"
        style={styles.cta}
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
  imageContainer: {
    width: '100%',
    height: 250,
    marginBottom: spacing.md,
  },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
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
    backgroundColor: colors.accent,
  },
  ctaText: { color: '#fff', fontWeight: '800' },
});
