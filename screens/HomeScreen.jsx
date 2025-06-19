import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LocationAutoDetect from "../components/LocationAutoDetect";
import CustomButton from "../components/CustomButton";
import SectionTitle from "../components/SectionTitle";
import { ROUTES } from "../constants/ROUTES";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SectionTitle>🏠 Головна</SectionTitle>
      <LocationAutoDetect />

      <CustomButton
        title="🔍 Пошук квартир"
        onPress={() => navigation.navigate(ROUTES.APARTMENT_LIST)}
        isActive={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
