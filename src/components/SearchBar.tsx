// SearchBar: search input and submit button (text or icon)
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { colors, radius, spacing } from '../theme/constants';
import { SearchNormal1 } from 'iconsax-react-native';

interface Props {
  onSearch: (city: string) => void;
  iconButton?: boolean;
}

export default function SearchBar({ onSearch, iconButton }: Props) {
  const [city, setCity] = useState('');

  const handleSubmit = () => {
    onSearch(city);
  };

  const clear = () => setCity('');

  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder="City name (e.g., Ankara)"
        placeholderTextColor={colors.textMuted}
        value={city}
        onChangeText={setCity}
        style={styles.input}
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
      />
      {!!city && (
        <TouchableOpacity
          onPress={clear}
          style={styles.clearBtn}
          accessibilityLabel="Clear"
        >
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.searchBtn]}
        accessibilityLabel="Search"
      >
        <Text style={styles.searchText}>
          {iconButton ? (
            <SearchNormal1 size="24" color={colors.text} variant="Outline" />
          ) : (
            'Search'
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.text,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  clearBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: { color: colors.textMuted, fontSize: 16 },
  searchBtn: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.border,
  },
  searchText: { color: '#fff', fontWeight: '700' },
});
