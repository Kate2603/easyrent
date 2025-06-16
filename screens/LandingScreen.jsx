import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../constants/ROUTES";

import CustomButton from "../components/CustomButton";
import SectionTitle from "../components/SectionTitle";

export default function LandingScreen() {
  const navigation = useNavigation();

  const goToApartmentsList = () => {
    navigation.navigate(ROUTES.HOME_TAB, {
      screen: ROUTES.HOME_STACK,
      params: {
        screen: ROUTES.APARTMENT_LIST,
      },
    });
  };

  return (
    <View style={styles.container}>
      <SectionTitle>Ласкаво просимо до EasyRent!</SectionTitle>
      <CustomButton title="Переглянути квартири" onPress={goToApartmentsList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
});
