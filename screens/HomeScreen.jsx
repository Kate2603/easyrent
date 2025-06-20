import React, { useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, loadUserProfile } from "../redux/userSlice";
import { loginSuccess } from "../redux/userSlice";
import { ROUTES } from "../constants/ROUTES";
import { useTheme } from "../contexts/ThemeContext";
import SectionTitle from "../components/SectionTitle";
import LocationAutoDetect from "../components/LocationAutoDetect";
import CustomButton from "../components/CustomButton";

function ThemeToggleButton() {
  const { toggleTheme, theme } = useTheme();
  return <Button title={`Тема: ${theme}`} onPress={toggleTheme} />;
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { theme } = useTheme();

  // для завантаження профілю з AsyncStorage ---
  useEffect(() => {
    dispatch(loadUserProfile());
  }, [dispatch]);

  const backgroundColor = theme === "light" ? "#fff" : "#121212";
  const textColor = theme === "light" ? "#000" : "#fff";

  const handleGoToRegister = () => {
    navigation.navigate("Register");
  };

  const handleFakeLogin = () => {
    dispatch(
      loginSuccess({
        user: {
          fullName: "Катерина Величко",
          email: "kateryna@example.com",
          avatar: "https://i.pravatar.cc/150?u=kateryna",
        },
        token: "mock-token",
      })
    );
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
          <CustomButton title="Увійти" onPress={handleFakeLogin} isActive />
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
            isActive={true}
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
