import React from "react";
import { Text, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";

export default function SectionTitle({ children, style }) {
  const { theme } = useTheme();
  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;

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
