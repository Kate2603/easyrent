import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";

export default function CustomButton({
  title,
  onPress,
  isActive = false,
  disabled = false,
  style,
  textStyle,
}) {
  const { isLight, primaryColor, backgroundColor, textColor, cardColor } =
    useThemeColors();

  const computedBg = isActive
    ? backgroundColor
    : disabled
    ? isLight
      ? "#F6F6F6"
      : "#2a2a2a"
    : primaryColor;

  const computedTextColor = isActive
    ? primaryColor
    : disabled
    ? isLight
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
      style={[
        styles.button,
        {
          backgroundColor: computedBg,
          borderColor: isActive ? primaryColor : "transparent",
        },
        style,
      ]}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, { color: computedTextColor }, textStyle]}>
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
