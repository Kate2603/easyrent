import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CustomButton({
  title,
  onPress,
  isActive = false,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        isActive && styles.activeButton,
        disabled && styles.disabledButton,
      ]}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          isActive && styles.activeText,
          disabled && styles.disabledText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#006FFD",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#006FFD",
  },
  disabledButton: {
    backgroundColor: "#F6F6F6",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  activeText: {
    color: "#006FFD",
  },
  disabledText: {
    color: "#AFAFAF",
  },
});
