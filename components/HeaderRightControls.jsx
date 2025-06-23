import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../contexts/ThemeContext";
import { useThemeColors } from "../hooks/useThemeColors";

export default function HeaderRightControls() {
  const { toggleTheme, theme } = useTheme();
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingRight: insets.right > 0 ? insets.right : 10,
        },
      ]}
    >
      <TouchableOpacity
        onPress={toggleTheme}
        style={styles.icon}
        accessibilityLabel={
          theme === "light" ? "Увімкнути темну тему" : "Увімкнути світлу тему"
        }
        accessibilityRole="button"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Icon
          name={theme === "light" ? "moon" : "sunny"}
          size={24}
          color={colors.primaryColor}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    padding: 8,
  },
});
