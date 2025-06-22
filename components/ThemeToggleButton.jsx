import React from "react";
import CustomButton from "./CustomButton";
import { useTheme } from "../contexts/ThemeContext";
import { useStrings } from "../hooks/useStrings";
import { useThemeColors } from "../hooks/useThemeColors";

export default function ThemeToggleButton() {
  const { toggleTheme, theme } = useTheme();
  const strings = useStrings();
  const { textColor } = useThemeColors(); // Якщо потрібно кольори для CustomButton (наприклад, передати як style)

  const nextTheme =
    theme === "light"
      ? strings.themeDark || "dark"
      : strings.themeLight || "light";

  return (
    <CustomButton
      title={`${strings.switchTheme || "Switch theme to: "} ${nextTheme}`}
      onPress={toggleTheme}
      isActive={false}
      accessibilityLabel={`${
        strings.switchTheme || "Switch theme to: "
      } ${nextTheme}`}
      // При потребі можна додати стилі з useThemeColors
      // style={{ backgroundColor: ..., color: textColor }}
    />
  );
}
