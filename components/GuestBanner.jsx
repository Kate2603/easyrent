import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";

export default function GuestBanner() {
  const colors = useThemeColors();

  return (
    <View style={[styles.banner, { backgroundColor: colors.warningBg }]}>
      <Text style={[styles.text, { color: colors.warningText }]}>
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
