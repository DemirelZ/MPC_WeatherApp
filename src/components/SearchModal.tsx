import React from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TouchableOpacity,
} from 'react-native';
import SearchBar from './SearchBar';
import Loader from './Loader';
import ErrorBanner from './ErrorBanner';
import { colors, spacing } from '../theme/constants';

interface Props {
  visible: boolean;
  onRequestClose: () => void;
  onSearch: (city: string) => void;
  loading: boolean;
  error: string | null;
  accent: string;
}

export default function SearchModal({
  visible,
  onRequestClose,
  onSearch,
  loading,
  error,
  accent,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.headerRow}>
              <TouchableOpacity
                onPress={onRequestClose}
                accessibilityLabel="Close"
                style={[styles.closeBtn, { borderColor: accent }]}
              >
                <Text style={[styles.closeText, { color: accent }]}>×</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Search city</Text>
            <SearchBar onSearch={onSearch} accent={accent} iconButton />
            {loading && <Loader color={accent} />}
            {error && <ErrorBanner message={error} />}
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl },
  headerRow: { alignItems: 'flex-end', marginBottom: spacing.sm },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: { fontSize: 18, fontWeight: '800' },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
});
