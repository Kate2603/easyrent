import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { ROUTES } from "../constants/ROUTES";
import SectionTitle from "../components/SectionTitle";
import CustomButton from "../components/CustomButton";

export default function SuccessScreen() {
  const navigation = useNavigation();

  const handleReturn = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: ROUTES.LANDING }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <SectionTitle>Дякуємо за бронювання!</SectionTitle>
      <Text style={styles.message}>
        Ми надіслали вам підтвердження на електронну пошту.
      </Text>
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
    backgroundColor: "#e8f5e9",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 24,
  },
});
