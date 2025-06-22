import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { markOnboardingSeen, setGuestUser } from "../redux/userSlice";
import { useThemeColors } from "../hooks/useThemeColors";

export default function OnboardingScreen({ navigation }) {
  const dispatch = useDispatch();
  const colors = useThemeColors();

  const handleStart = async () => {
    await dispatch(markOnboardingSeen());
    navigation.replace("Register"); // або Login
  };

  const handleGuest = async () => {
    await dispatch(markOnboardingSeen());
    dispatch(setGuestUser());
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <Text style={[styles.title, { color: colors.onPrimary }]}>
        Ласкаво просимо до EasyRent!
      </Text>
      <Text style={[styles.subtitle, { color: colors.onPrimary }]}>
        Знаходь житло за кілька кліків.
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.background }]}
        onPress={handleStart}
      >
        <Text style={[styles.buttonText, { color: colors.primary }]}>
          Почати
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={handleGuest}>
        <Text style={[styles.linkText, { color: colors.onPrimary }]}>
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
  },
});
