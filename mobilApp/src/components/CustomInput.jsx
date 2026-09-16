import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { color, colors } from "../styles/colors.js";

export default function CustomInput({
  label,
  placeholder,
  value,
  onChangeText,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.carbonBlack,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: colors.platinum,
  },
});
