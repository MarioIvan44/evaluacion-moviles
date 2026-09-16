import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {colors} from "../styles/colors.js"

export default function CustomButton({
  title = 'Botón',
  onPress,
  backgroundColor = colors.cornFlowerOcean,
  textColor = colors.platinum,
}) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: backgroundColor }, ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
