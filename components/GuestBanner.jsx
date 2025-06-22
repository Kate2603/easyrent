import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";

export default function GuestBanner() {
  const { warningBg, warningText } = useThemeColors();

  return (
    <View style={[styles.banner, { backgroundColor: warningBg }]}>
      <Text style={[styles.text, { color: warningText }]}>
        Ви переглядаєте як гість. Деякі функції можуть бути недоступні.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    padding: 10,
    alignItems: "center",
    zIndex: 9999,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
  },
});
