import React from "react";
import CustomButton from "./CustomButton";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggleButton() {
  const { toggleTheme, theme } = useTheme();
  const nextTheme = theme === "light" ? "темна" : "світла";

  return (
    <CustomButton
      title={`Перемкнути тему: ${nextTheme}`}
      onPress={toggleTheme}
      isActive={false}
    />
  );
}
