import { COLORS } from "../constants/colors";

/**
 * Повертає адаптовану палітру кольорів відповідно до теми.
 * @param {"light" | "dark"} theme
 * @returns {{
 *   isLight: boolean;
 *   backgroundColor: string;
 *   textColor: string;
 *   cardColor: string;
 *   primaryColor: string;
 *   chipActiveBg: string;
 *   chipActiveText: string;
 *   avatarBorder: string;
 *   placeholderColor: string;
 *   borderColor: string;
 *   warningBg: string;
 *   warningText: string;
 * }}
 */
export function themeColorsAdapter(theme = "light") {
  const safeTheme = ["light", "dark"].includes(theme) ? theme : "light";

  if (theme !== safeTheme) {
    console.warn(`⚠️ Unknown theme "${theme}", falling back to "${safeTheme}"`);
  }

  const base = COLORS[safeTheme];

  if (!base) {
    throw new Error(
      `❌ themeColorsAdapter: COLORS["${safeTheme}"] is undefined`
    );
  }

  return {
    isLight: safeTheme === "light",
    backgroundColor: base.background,
    textColor: base.text,
    cardColor: base.card,
    primaryColor: base.primary,
    chipActiveBg: base.chipActiveBg,
    chipActiveText: base.chipActiveText,
    avatarBorder: base.avatarBorder,
    placeholderColor: base.placeholder,
    borderColor: base.border,
    warningBg: base.warningBg,
    warningText: base.warningText,
  };
}
