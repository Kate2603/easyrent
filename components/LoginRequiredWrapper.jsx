import React from "react";
import { useSelector } from "react-redux";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../constants/ROUTES";
import { useThemeColors } from "../hooks/useThemeColors";

export default function LoginRequiredWrapper({ children }) {
  const user = useSelector((state) => state.user.user);
  const navigation = useNavigation();
  const { backgroundColor, textColor } = useThemeColors();

  if (!user || user.role === "guest") {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={[styles.text, { color: textColor }]}>
          Для цієї дії потрібно увійти в обліковий запис.
        </Text>
        <Button
          title="Увійти"
          onPress={() => navigation.navigate(ROUTES.LOGIN)}
          color={textColor} // колір кнопки адаптований під тему
        />
      </View>
    );
  }

  return children;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 12,
  },
});
