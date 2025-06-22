import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { markOnboardingSeen, setGuestUser } from "../redux/userSlice";

export default function OnboardingScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleStart = async () => {
    await dispatch(markOnboardingSeen());
    navigation.replace("Register"); // або Login
  };

  const handleGuest = async () => {
    await dispatch(markOnboardingSeen());
    dispatch(setGuestUser());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ласкаво просимо до EasyRent!</Text>
      <Text style={styles.subtitle}>Знаходь житло за кілька кліків.</Text>

      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Почати</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={handleGuest}>
        <Text style={styles.linkText}>Продовжити як гість</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginVertical: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#007AFF",
    fontSize: 18,
    fontWeight: "600",
  },
  linkButton: {
    marginTop: 20,
  },
  linkText: {
    color: "#fff",
    textDecorationLine: "underline",
  },
});
