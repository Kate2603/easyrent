// HomeScreen.jsx
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { loadUserProfile } from "../redux/userSlice";
import { ROUTES } from "../constants/ROUTES";
import { useTheme } from "../contexts/ThemeContext";
import SectionTitle from "../components/SectionTitle";
import LocationAutoDetect from "../components/LocationAutoDetect";
import CustomButton from "../components/CustomButton";
import ThemeToggleButton from "../components/ThemeToggleButton"; // імпорт нового перемикача

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(loadUserProfile());
  }, [dispatch]);

  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkBackground;
  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;

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
    <View style={[styles.container, { backgroundColor }]}>
      <SectionTitle>🏠 Головна</SectionTitle>

      <ThemeToggleButton />

      {!user ? (
        <>
          <Text style={[styles.text, { color: textColor }]}>
            Ви не залогінені
          </Text>
          <CustomButton
            title="Зареєструватися"
            onPress={handleGoToRegister}
            isActive
          />
          <CustomButton title="Увійти" onPress={handleLogin} isActive />
        </>
      ) : (
        <>
          <Text style={[styles.text, { color: textColor }]}>
            Привіт, {user.fullName}
          </Text>
          <LocationAutoDetect />
          <CustomButton
            title="🔍 Пошук квартир"
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
