import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { ROUTES } from "../constants/ROUTES";
import SectionTitle from "../components/SectionTitle";
import CustomButton from "../components/CustomButton";
import { useThemeColors } from "../hooks/useThemeColors";

export default function SuccessScreen() {
  const navigation = useNavigation();
  const { backgroundColor, textColor, cardColor } = useThemeColors();

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
      <SectionTitle style={{ color: textColor }}>
        Дякуємо за бронювання!
      </SectionTitle>

      <View style={[styles.messageBox, { backgroundColor: cardColor }]}>
        <Text style={[styles.message, { color: textColor }]}>
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
  messageBox: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 24,
    width: "100%",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
  },
});
