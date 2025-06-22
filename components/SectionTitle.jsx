import React from "react";
import { Text, StyleSheet } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";

export default function SectionTitle({ children, style }) {
  const { textColor } = useThemeColors();

  return (
    <Text
      style={[styles.title, { color: textColor }, style]}
      accessibilityRole="header"
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 6 },
});
