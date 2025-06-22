import React from "react";
import CustomButton from "./CustomButton";
import { useTheme } from "../contexts/ThemeContext";
import { useStrings } from "../hooks/useStrings";
import { useThemeColors } from "../hooks/useThemeColors";

export default function ThemeToggleButton() {
  const { toggleTheme, theme } = useTheme();
  const strings = useStrings();
  const { primaryColor, cardColor } = useThemeColors();

  const nextTheme =
    theme === "light"
      ? strings.themeDark || "dark"
      : strings.themeLight || "light";

  const labelPrefix = strings.switchTheme || "Switch theme to: ";

  return (
    <CustomButton
      title={`${labelPrefix}${nextTheme}`}
      onPress={toggleTheme}
      isActive={false}
      accessibilityLabel={`${labelPrefix}${nextTheme}`}
      style={{
        backgroundColor: cardColor,
        borderColor: primaryColor,
      }}
      textStyle={{ color: primaryColor }}
    />
  );
}
