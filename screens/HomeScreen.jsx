import React, { useEffect, useLayoutEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Головна",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{ marginLeft: 16 }}
        >
          <Ionicons name="menu" size={24} color={colors.textColor} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, colors]);

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

  const handleSearch = () => {
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
        {strings.home}
      </SectionTitle>

      <ThemeToggleButton />

      {!user ? (
        <>
          <Text style={[styles.text, { color: colors.textColor }]}>
            {strings.notLoggedIn}
          </Text>
          <CustomButton
            title={strings.register}
            onPress={handleGoToRegister}
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
        <>
          <Text style={[styles.text, { color: colors.textColor }]}>
            {strings.greeting}, {user.fullName || "User"}
          </Text>
          <LocationAutoDetect />
          <CustomButton
            title={strings.search}
            onPress={handleSearch}
            isActive
            activeBgColor={colors.primaryColor}
            activeTextColor={colors.chipActiveText}
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
