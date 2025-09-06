import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import SearchModal from './src/components/SearchModal';
import EmptyState from './src/components/EmptyState';
import LinearGradient from 'react-native-linear-gradient';
import { useWeather } from './src/hooks/useWeather';
import { colors, spacing, radius } from './src/theme/constants';
import { themeFromMain } from './src/utils/weatherTheme';

export default function App() {
  const { data, loading, error, fetchWeather } = useWeather();
  const [modalVisible, setModalVisible] = useState(false);
  const accent = themeFromMain(data?.weather?.[0]?.main).accent;

  useEffect(() => {
    if (data && !loading && !error) setModalVisible(false);
  }, [data, loading, error]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.topBar}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                accessibilityLabel="Open search"
                style={[styles.plusBtn, { borderColor: accent }]}
              >
                <Text style={[styles.plusText, { color: accent }]}>＋</Text>
              </TouchableOpacity>
            </View>
            {!data && !loading && !error && (
              <EmptyState
                onOpen={() => setModalVisible(true)}
                accent={accent}
              />
            )}
            {data && !loading && !error && (
              <View style={styles.centerBlock}>
                <LinearGradient
                  colors={[`${accent}22`, `${accent}00`]}
                  style={styles.heroGradient}
                />
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
                <Text style={[styles.tempHuge, { color: accent }]}>
                  {Math.round(data.main.temp)}°C
                </Text>
                <Text style={styles.descLarge}>
                  {data.weather?.[0]?.description}
                </Text>
                <View style={styles.metaRow}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      Feels like {Math.round(data.main.feels_like)}°C
                    </Text>
                  </View>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      💧 {data.main.humidity}%
                    </Text>
                  </View>
                </View>
                <Text style={styles.updatedText}>
                  Last updated: {new Date().toLocaleTimeString()}
                </Text>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>

        <SearchModal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          onSearch={fetchWeather}
          loading={loading}
          error={error}
          accent={accent}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  footer: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  topBar: { marginBottom: spacing.lg },
  plusBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusText: { fontSize: 22, fontWeight: '800' },
  centerBlock: {
    alignItems: 'center',
  },
  heroGradient: {
    width: '100%',
    height: 120,
    borderRadius: 16,
    marginBottom: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
    marginBottom: spacing.sm,
    justifyContent: 'center',
  },
  cityBig: { color: colors.text, fontSize: 32, fontWeight: '900' },
  countryBig: { color: colors.textMuted, fontSize: 22, fontWeight: '800' },
  iconLarge: { width: 200, height: 200, marginVertical: spacing.sm },
  tempHuge: { fontSize: 80, fontWeight: '900' },
  descLarge: {
    color: colors.text,
    textTransform: 'capitalize',
    marginTop: 4,
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
    marginTop: spacing.lg,
    fontSize: 12,
  },
});
