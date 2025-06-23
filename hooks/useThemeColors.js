import { useTheme } from "../contexts/ThemeContext";
import { themeColorsAdapter } from "../utils/themeColorsAdapter";

export function useThemeColors() {
  const { theme } = useTheme();
  return themeColorsAdapter(theme ?? "light");
}

// import React from "react";
// import { useTheme } from "../contexts/ThemeContext";
// import { COLORS } from "../constants/colors";

// export function useThemeColors() {
//   const { theme = "light" } = useTheme() || {};
//   const colors = COLORS[theme];

//   if (!colors) {
//     console.warn(`❌ Unknown theme "${theme}", falling back to light`);
//   }

//   // Дебаг лог:
//   console.log("🎨 ThemeColors:", theme, {
//     primaryColor: colors?.primary,
//   });

//   return React.useMemo(
//     () => ({
//       isLight: theme === "light",
//       ...colors,
//     }),
//     [theme]
//   );
// }
