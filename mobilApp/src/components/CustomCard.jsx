import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../styles/colors.js';

export default function CustomCard({
  children,
  backgroundColor = colors.platinum,
  borderRadius = 15,
  padding = 20,
}) {
  return (
    <View style={[styles.card, { backgroundColor, borderRadius, padding }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
