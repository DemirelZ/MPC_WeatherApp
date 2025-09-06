// Loader: centered ActivityIndicator used while fetching data
import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { colors } from '../theme/constants';

interface Props {
  color?: string;
}

export default function Loader({ color }: Props) {
  return (
    <View style={styles.overlay} pointerEvents="none">
      <ActivityIndicator size="large" color={color || colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    marginTop: 12,
    alignItems: 'center',
  },
});
