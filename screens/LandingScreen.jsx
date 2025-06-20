import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { ROUTES } from "../constants/ROUTES";
import { useTheme } from "../contexts/ThemeContext";
import CustomButton from "../components/CustomButton";
import SectionTitle from "../components/SectionTitle";

function ThemeToggleButton() {
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

export default function LandingScreen() {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.user);
  const { theme } = useTheme();

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
      <SectionTitle>Ласкаво просимо до EasyRent!</SectionTitle>
      <ThemeToggleButton />

      {!user ? (
        <>
          <Text style={[styles.text, { color: textColor }]}>
            Щоб почати, увійдіть або зареєструйтесь
          </Text>
          <CustomButton title="Зареєструватися" onPress={handleRegister} />
          <CustomButton title="Увійти" onPress={handleLogin} isActive />
        </>
      ) : (
        <CustomButton
          title="Переглянути квартири"
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
