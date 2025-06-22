import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";

export function useThemeColors() {
  const { theme } = useTheme();

  const isLight = theme === "light";

  return React.useMemo(
    () => ({
      isLight,
      backgroundColor: isLight ? COLORS.lightBackground : COLORS.darkBackground,
      textColor: isLight ? COLORS.lightText : COLORS.darkText,
      cardColor: isLight ? COLORS.lightCard : COLORS.darkCard,
      primaryColor: isLight ? COLORS.primaryLight : COLORS.primaryDark,
      avatarBorder: isLight
        ? COLORS.lightAvatarBorder
        : COLORS.darkAvatarBorder,
      chipActiveBg: isLight
        ? COLORS.chipActiveBgLight
        : COLORS.chipActiveBgDark,
      chipActiveText: isLight
        ? COLORS.chipActiveTextLight
        : COLORS.chipActiveTextDark,
      placeholderColor: isLight
        ? COLORS.placeholderLight
        : COLORS.placeholderDark,
      borderColor: isLight ? COLORS.borderLight : COLORS.borderDark,
      warningBg: isLight ? "#FFF3CD" : "#665c00",
      warningText: isLight ? "#664d03" : "#fff8dc",
    }),
    [isLight]
  );
}
