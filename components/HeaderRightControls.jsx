import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";
import { useThemeColors } from "../hooks/useThemeColors";

export default function HeaderRightControls() {
  const navigation = useNavigation();
  const { toggleTheme, theme } = useTheme();
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={[styles.icon, styles.iconMargin]}
        accessibilityLabel="Відкрити меню"
        accessibilityRole="button"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Icon name="menu" size={24} color={colors.primaryColor} />
      </TouchableOpacity>

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
    marginRight: 8,
  },
  icon: {
    padding: 8,
  },
  iconMargin: {
    marginRight: 16,
  },
});
