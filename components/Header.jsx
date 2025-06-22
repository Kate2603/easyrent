import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useThemeColors } from "../hooks/useThemeColors";

export default function Header({ title, onBack }) {
  const { backgroundColor, primaryColor, borderColor } = useThemeColors();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, borderBottomColor: borderColor },
      ]}
      accessibilityRole="header"
    >
      {onBack && (
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Icon name="chevron-back" size={26} color={primaryColor} />
        </TouchableOpacity>
      )}
      <Text style={[styles.title, { color: primaryColor }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 12,
    padding: 8,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
});
