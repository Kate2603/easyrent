import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { ROUTES } from "../constants/ROUTES";
import { useTheme } from "../contexts/ThemeContext";
import { useLocale } from "../contexts/LocaleContext";

import CustomButton from "../components/CustomButton";
import SectionTitle from "../components/SectionTitle";
import { COLORS } from "../constants/colors";

const TEXTS = {
  uk: {
    welcome: "Ласкаво просимо до EasyRent!",
    themeSwitch: {
      light: "Перемкнути тему: темна",
      dark: "Перемкнути тему: світла",
    },
    prompt: "Щоб почати, увійдіть або зареєструйтесь",
    register: "Зареєструватися",
    login: "Увійти",
    viewApartments: "Переглянути квартири",
  },
  en: {
    welcome: "Welcome to EasyRent!",
    themeSwitch: {
      light: "Switch theme: dark",
      dark: "Switch theme: light",
    },
    prompt: "To get started, please log in or register",
    register: "Register",
    login: "Login",
    viewApartments: "View Apartments",
  },
};

function ThemeToggleButton() {
  const { toggleTheme, theme } = useTheme();
  const { locale } = useLocale();
  const strings = TEXTS[locale] || TEXTS.uk;

  const title =
    theme === "light" ? strings.themeSwitch.light : strings.themeSwitch.dark;

  return <CustomButton title={title} onPress={toggleTheme} isActive={false} />;
}

export default function LandingScreen() {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.user);
  const { theme } = useTheme();
  const { locale } = useLocale();
  const strings = TEXTS[locale] || TEXTS.uk;

  const handleRegister = () => {
    navigation.navigate(ROUTES.HOME_TAB, {
      screen: ROUTES.HOME_STACK,
      params: { screen: ROUTES.REGISTER },
    });
  };

  const handleLogin = () => {
    navigation.navigate(ROUTES.HOME_TAB, {
      screen: ROUTES.HOME_STACK,
      params: { screen: ROUTES.LOGIN },
    });
  };

  const goToApartmentsList = () => {
    navigation.navigate(ROUTES.HOME_TAB, {
      screen: ROUTES.HOME_STACK,
      params: {
        screen: ROUTES.APARTMENT_LIST,
      },
    });
  };

  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkBackground;
  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <SectionTitle>{strings.welcome}</SectionTitle>
      <ThemeToggleButton />

      {!user ? (
        <>
          <Text style={[styles.text, { color: textColor }]}>
            {strings.prompt}
          </Text>
          <CustomButton title={strings.register} onPress={handleRegister} />
          <CustomButton title={strings.login} onPress={handleLogin} isActive />
        </>
      ) : (
        <CustomButton
          title={strings.viewApartments}
          onPress={goToApartmentsList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    fontSize: 16,
    marginVertical: 16,
    textAlign: "center",
  },
});
