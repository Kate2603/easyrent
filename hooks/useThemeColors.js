import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";

export function useThemeColors() {
  const { theme } = useTheme();

  const isLight = theme === "light";

  return {
    backgroundColor: isLight ? COLORS.lightBackground : COLORS.darkBackground,
    textColor: isLight ? COLORS.lightText : COLORS.darkText,
    cardColor: isLight ? COLORS.lightCard : COLORS.darkCard,
    primaryColor: isLight ? COLORS.primaryLight : COLORS.primaryDark,
    avatarBorder: isLight ? COLORS.lightAvatarBorder : COLORS.darkAvatarBorder,
    chipActiveBg: isLight ? COLORS.chipActiveBgLight : COLORS.chipActiveBgDark,
    chipActiveText: isLight
      ? COLORS.chipActiveTextLight
      : COLORS.chipActiveTextDark,
  };
}
