import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import type { WeatherApiResponse } from '../types/weather';
import { colors, radius, spacing, shadow } from '../theme/constants';
import { themeFromMain } from '../utils/weatherTheme';

interface Props {
  data: WeatherApiResponse;
}

export default function WeatherCard({ data }: Props) {
  const w = data.weather?.[0];
  const iconUrl = w ? `https://openweathermap.org/img/wn/${w.icon}@4x.png` : '';
  const th = themeFromMain(w?.main);
  return (
    <View style={[styles.card, shadow.card, { borderColor: th.accentAlt }]}>
      <View style={styles.header}>
        <Text style={styles.city}>{data.name}</Text>
        <Text style={styles.country}>{data.sys.country}</Text>
      </View>

      <View style={styles.row}>
        {!!iconUrl && <Image source={{ uri: iconUrl }} style={styles.icon} />}
        <View>
          <Text style={[styles.temp, { color: th.accent }]}>
            {Math.round(data.main.temp)}°C
          </Text>
          <Text style={styles.desc}>{w?.description}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            Hissedilen {Math.round(data.main.feels_like)}°C
          </Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>💧 {data.main.humidity}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  city: { color: colors.text, fontSize: 22, fontWeight: '800' },
  country: { color: colors.textMuted, fontSize: 16, fontWeight: '600' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  icon: { width: 96, height: 96 },
  temp: { fontSize: 44, fontWeight: '800' },
  desc: {
    color: colors.textMuted,
    textTransform: 'capitalize',
    marginTop: 2,
    fontSize: 16,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
    flexWrap: 'wrap',
  },
  badge: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: '#0b172a',
  },
  badgeText: { color: colors.textMuted, fontWeight: '600' },
});
