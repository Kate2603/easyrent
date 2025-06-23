import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";

const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const systemTheme = Appearance.getColorScheme() || "light";
  const [theme, setThemeState] = useState(systemTheme);

  // Завантаження теми з AsyncStorage
  useEffect(() => {
    (async () => {
      const storedTheme = await AsyncStorage.getItem("APP_THEME");
      if (storedTheme) {
        setThemeState(storedTheme);
      } else {
        setThemeState(systemTheme);
      }
    })();
  }, []);

  // Слухаємо зміну системної теми тільки якщо користувач ще не вибрав власну
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      AsyncStorage.getItem("APP_THEME").then((storedTheme) => {
        if (!storedTheme) {
          setThemeState(colorScheme || "light");
        }
      });
    });
    return () => listener.remove();
  }, []);

  const setTheme = async (value) => {
    await AsyncStorage.setItem("APP_THEME", value);
    setThemeState(value);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
