import React from "react";
import { Text, StyleSheet } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";

const TITLE_SIZES = {
  1: 28,
  2: 24,
  3: 20,
  4: 16,
};

export default function SectionTitle({
  children,
  style,
  level = 1,
  uppercase = false,
}) {
  const { textColor } = useThemeColors();

  return (
    <Text
      style={[
        styles.title,
        { color: textColor, fontSize: TITLE_SIZES[level] || TITLE_SIZES[1] },
        uppercase && styles.uppercase,
        style,
      ]}
      accessibilityRole="header"
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  uppercase: {
    textTransform: "uppercase",
  },
});
