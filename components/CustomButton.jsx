import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export default function CustomButton({
  title,
  onPress,
  isActive = false,
  disabled = false,
  style,
  textStyle,
}) {
  const { theme } = useTheme();

  const backgroundColor = isActive
    ? theme === "light"
      ? "#FFFFFF"
      : "#333333"
    : disabled
    ? theme === "light"
      ? "#F6F6F6"
      : "#2a2a2a"
    : "#006FFD";

  const borderColor = isActive ? "#006FFD" : "transparent";

  const textColor = isActive
    ? "#006FFD"
    : disabled
    ? theme === "light"
      ? "#AFAFAF"
      : "#666666"
    : "#FFFFFF";

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={[styles.button, { backgroundColor, borderColor }, style]}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, { color: textColor }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
  },
});
