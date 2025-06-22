import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { ROUTES } from "../constants/ROUTES";
import { useThemeColors } from "../hooks/useThemeColors";
import { useStrings } from "../hooks/useStrings";
import { useTheme } from "../contexts/ThemeContext";

import CustomButton from "../components/CustomButton";
import SectionTitle from "../components/SectionTitle";

function ThemeToggleButton() {
  const { toggleTheme, theme } = useTheme();
  const { strings } = useStrings();
  const colors = useThemeColors();

  const title =
    theme === "light" ? strings.themeSwitch.light : strings.themeSwitch.dark;

  return (
    <CustomButton
      title={title}
      onPress={toggleTheme}
      isActive={false}
      activeBgColor={colors.primaryColor}
      activeTextColor={colors.chipActiveText}
    />
  );
}

export default function LandingScreen() {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.user);
  const colors = useThemeColors();
  const { strings } = useStrings();

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
      params: { screen: ROUTES.APARTMENT_LIST },
    });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundColor }]}
    >
      <SectionTitle style={{ color: colors.textColor }}>
        {strings.welcome}
      </SectionTitle>
      <ThemeToggleButton />

      {!user ? (
        <>
          <Text style={[styles.text, { color: colors.textColor }]}>
            {strings.prompt}
          </Text>
          <CustomButton
            title={strings.register}
            onPress={handleRegister}
            isActive
            activeBgColor={colors.primaryColor}
            activeTextColor={colors.chipActiveText}
          />
          <CustomButton
            title={strings.login}
            onPress={handleLogin}
            isActive
            activeBgColor={colors.primaryColor}
            activeTextColor={colors.chipActiveText}
          />
        </>
      ) : (
        <CustomButton
          title={strings.viewApartments}
          onPress={goToApartmentsList}
          isActive
          activeBgColor={colors.primaryColor}
          activeTextColor={colors.chipActiveText}
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
