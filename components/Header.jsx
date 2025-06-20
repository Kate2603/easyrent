import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";

const Header = ({ title, onBack }) => {
  const { theme } = useTheme();

  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkBackground;
  const borderColor = theme === "light" ? "#eee" : "#333";
  const textColor = theme === "light" ? "#006FFD" : "#66AAFF";
  const iconColor = textColor;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, borderBottomColor: borderColor },
      ]}
    >
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="chevron-back" size={26} color={iconColor} />
        </TouchableOpacity>
      )}
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 12,
    padding: 6,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
});

export default Header;
