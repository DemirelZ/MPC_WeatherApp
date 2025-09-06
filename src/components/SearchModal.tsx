// SearchModal: wraps SearchBar inside a modal; shows loader and error state
import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from './SearchBar';
import Loader from './Loader';
import ErrorBanner from './ErrorBanner';
import { colors, spacing } from '../theme/constants';
import { CloseCircle } from 'iconsax-react-native';

interface Props {
  visible: boolean;
  onRequestClose: () => void;
  onSearch: (city: string) => void;
  loading: boolean;
  error: string | null;
}

export default function SearchModal({
  visible,
  onRequestClose,
  onSearch,
  loading,
  error,
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
              >
                <CloseCircle size="32" color={colors.text} variant="Outline" />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Search city</Text>
            <SearchBar onSearch={onSearch} iconButton />
            {loading && <Loader />}
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
