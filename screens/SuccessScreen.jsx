import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { ROUTES } from "../constants/ROUTES";
import SectionTitle from "../components/SectionTitle";
import CustomButton from "../components/CustomButton";
import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";

export default function SuccessScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkBackground;
  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;
  const secondaryTextColor = theme === "light" ? "#555" : "#aaa";

  const handleReturn = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: ROUTES.LANDING }],
      })
    );
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <SectionTitle>Дякуємо за бронювання!</SectionTitle>

      <View
        style={{
          backgroundColor: theme === "light" ? "#f0f4ff" : "#2a2a2a",
          padding: 12,
          borderRadius: 10,
          marginBottom: 24,
        }}
      >
        <Text style={[styles.message, { color: secondaryTextColor }]}>
          Ми надіслали вам підтвердження на електронну пошту.
        </Text>
      </View>

      <CustomButton
        title="Повернутись на головну"
        onPress={handleReturn}
        isActive
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },
});
