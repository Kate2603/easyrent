import React from "react";
import CustomButton from "./CustomButton";
import { useTheme } from "../contexts/ThemeContext";
import { useStrings } from "../hooks/useStrings";
import { useThemeColors } from "../hooks/useThemeColors";

export default function ThemeToggleButton() {
  const { toggleTheme, theme } = useTheme();
  const strings = useStrings();
  const { textColor, primaryColor, cardColor } = useThemeColors();

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
      style={{
        backgroundColor: cardColor,
        color: primaryColor,
        borderColor: primaryColor,
      }}
      textStyle={{ color: primaryColor }}
    />
  );
}
