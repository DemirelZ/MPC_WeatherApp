// HomeContent: main scrollable weather view rendered on the home screen
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { colors, spacing, radius } from '../theme/constants';
import EmptyState from './EmptyState';
import { LocationAdd } from 'iconsax-react-native';
import type { WeatherApiResponse } from '../types/weather';

interface Props {
  data: WeatherApiResponse | null;
  loading: boolean;
  error: string | null;
  onOpenModal: () => void;
}

function degToCardinal(deg?: number) {
  if (deg == null) return '';
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const idx = Math.round(deg / 45) % 8;
  return dirs[idx];
}

function formatLocalTime(unix?: number, tz?: number) {
  if (!unix) return '';
  const offsetSec = tz ?? 0;
  const date = new Date((unix + offsetSec) * 1000);
  return date.toLocaleTimeString();
}

export default function HomeContent({
  data,
  loading,
  error,
  onOpenModal,
}: Props) {
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={onOpenModal}
          accessibilityLabel="Open search"
        >
          <LocationAdd size="38" color={colors.text} variant="Outline" />
        </TouchableOpacity>
      </View>

      {!data && !loading && !error && <EmptyState onOpen={onOpenModal} />}

      {data && !loading && !error && (
        <View style={styles.centerBlock}>
          <View style={styles.titleRow}>
            <Text style={styles.cityBig}>{data.name}</Text>
            <Text style={styles.countryBig}>{data.sys.country}</Text>
          </View>
          {data.weather?.[0]?.icon ? (
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
              }}
              style={styles.iconLarge}
            />
          ) : null}
          <View style={styles.tempRow}>
            <Text style={styles.tempHuge}>{Math.round(data.main.temp)}</Text>
            <Text style={styles.tempUnit}>°c</Text>
          </View>
          <Text style={styles.descLarge}>{data.weather?.[0]?.description}</Text>

          <View style={styles.metaRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                Feels like {Math.round(data.main.feels_like)}°C
              </Text>
            </View>
            {!!data.main.temp_min && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  Min {Math.round(data.main.temp_min)}°C
                </Text>
              </View>
            )}
            {!!data.main.temp_max && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  Max {Math.round(data.main.temp_max)}°C
                </Text>
              </View>
            )}
            <View style={styles.badge}>
              <Text style={styles.badgeText}>💧 {data.main.humidity}%</Text>
            </View>
            {!!data.main.pressure && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  Pressure {data.main.pressure} hPa
                </Text>
              </View>
            )}
            {!!data.wind?.speed && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  Wind {Math.round(data.wind.speed)} m/s{' '}
                  {degToCardinal(data.wind.deg)}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.metaRow}>
            {!!data.sys.sunrise && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  Sunrise {formatLocalTime(data.sys.sunrise, data.timezone)}
                </Text>
              </View>
            )}
            {!!data.sys.sunset && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  Sunset {formatLocalTime(data.sys.sunset, data.timezone)}
                </Text>
              </View>
            )}
            {!!data.visibility && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  Visibility{' '}
                  {Math.round((data.visibility as number) / 100) / 10} km
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.updatedText}>
            Last updated: {new Date().toLocaleTimeString()}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl },
  topBar: { marginBottom: spacing.lg },
  centerBlock: { alignItems: 'center' },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
    marginBottom: spacing.sm,
    justifyContent: 'center',
  },
  cityBig: { color: colors.text, fontSize: 32, fontWeight: '900' },
  countryBig: { color: colors.textMuted, fontSize: 22, fontWeight: '800' },
  iconLarge: { width: 200, height: 200 },
  tempRow: { flexDirection: 'row', alignItems: 'flex-start' },
  tempHuge: {
    fontSize: 100,
    fontWeight: '400',
    includeFontPadding: false,
    lineHeight: 100,
    color: colors.text,
  },
  tempUnit: {
    fontSize: 40,
    fontWeight: '400',
    color: colors.textMuted,
    includeFontPadding: false,
    lineHeight: 40,
  },
  descLarge: {
    color: colors.text,
    textTransform: 'capitalize',
    marginTop: 4,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
    flexWrap: 'wrap',
    justifyContent: 'center',
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
  updatedText: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xxl,
    fontSize: 12,
  },
});
