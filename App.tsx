import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchModal from './src/components/SearchModal';
import HomeContent from './src/components/HomeContent';
import { useWeather } from './src/hooks/useWeather';
import { colors } from './src/theme/constants';
// types used implicitly via hook response shape

export default function App() {
  const { data, loading, error, fetchWeather, clearError } = useWeather();
  const [modalVisible, setModalVisible] = useState(false);

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
          <HomeContent
            data={data}
            loading={loading}
            error={error}
            onOpenModal={() => {
              clearError();
              setModalVisible(true);
            }}
          />
        </KeyboardAvoidingView>

        <SearchModal
          visible={modalVisible}
          onRequestClose={() => {
            clearError();
            setModalVisible(false);
          }}
          onSearch={fetchWeather}
          loading={loading}
          error={error}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

// helpers moved into HomeContent

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
});
