import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { markOnboardingSeen, setGuestUser } from "../redux/userSlice";
import { useThemeColors } from "../hooks/useThemeColors";

export default function OnboardingScreen({ navigation }) {
  const dispatch = useDispatch();
  const colors = useThemeColors();

  const token = useSelector((state) => state.user.token);
  const isRegistered = !!token;

  const handleStart = async () => {
    await dispatch(markOnboardingSeen());
    navigation.replace(isRegistered ? "Login" : "Register");
  };

  const handleGuest = async () => {
    await dispatch(markOnboardingSeen());
    await dispatch(setGuestUser());
    navigation.replace("Home");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.primaryColor }]}>
      <Text style={[styles.title, { color: colors.chipActiveText }]}>
        Ласкаво просимо до EasyRent!
      </Text>
      <Text style={[styles.subtitle, { color: colors.chipActiveText }]}>
        Знаходь житло за кілька кліків.
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.backgroundColor }]}
        onPress={handleStart}
        accessibilityRole="button"
      >
        <Text style={[styles.buttonText, { color: colors.primaryColor }]}>
          Почати
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={handleGuest}
        accessibilityRole="button"
      >
        <Text style={[styles.linkText, { color: colors.chipActiveText }]}>
          Продовжити як гість
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 20,
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  linkButton: {
    marginTop: 20,
  },
  linkText: {
    textDecorationLine: "underline",
    fontSize: 16,
  },
});
