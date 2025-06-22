import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import { loadUserProfile } from "../redux/userSlice";
import { ROUTES } from "../constants/ROUTES";
import { useThemeColors } from "../hooks/useThemeColors";
import { useLocale } from "../contexts/LocaleContext";

import SectionTitle from "../components/SectionTitle";
import LocationAutoDetect from "../components/LocationAutoDetect";
import CustomButton from "../components/CustomButton";
import ThemeToggleButton from "../components/ThemeToggleButton";

const TEXTS = {
  uk: {
    home: "🏠 Головна",
    notLoggedIn: "Ви не залогінені",
    register: "Зареєструватися",
    login: "Увійти",
    greeting: "Привіт",
    search: "🔍 Пошук квартир",
  },
  en: {
    home: "🏠 Home",
    notLoggedIn: "You are not logged in",
    register: "Register",
    login: "Login",
    greeting: "Hello",
    search: "🔍 Search apartments",
  },
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const colors = useThemeColors();
  const { locale } = useLocale();
  const strings = TEXTS[locale] || TEXTS.uk;

  useEffect(() => {
    dispatch(loadUserProfile());
  }, [dispatch]);

  const handleGoToRegister = () => {
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

  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundColor }]}
    >
      <SectionTitle>{strings.home}</SectionTitle>

      <ThemeToggleButton />

      {!user ? (
        <>
          <Text style={[styles.text, { color: colors.text }]}>
            {strings.notLoggedIn}
          </Text>
          <CustomButton
            title={strings.register}
            onPress={handleGoToRegister}
            isActive
          />
          <CustomButton title={strings.login} onPress={handleLogin} isActive />
        </>
      ) : (
        <>
          <Text style={[styles.text, { color: colors.text }]}>
            {strings.greeting}, {user.fullName}
          </Text>
          <LocationAutoDetect />
          <CustomButton
            title={strings.search}
            onPress={() => navigation.navigate(ROUTES.APARTMENT_LIST)}
            isActive
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
});
