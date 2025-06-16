import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../components/CustomButton";
import SectionTitle from "../components/SectionTitle";
import { ROUTES } from "../constants/ROUTES";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SectionTitle>🏠 Головна</SectionTitle>

      <CustomButton
        title="До деталей квартири"
        onPress={() =>
          navigation.navigate(ROUTES.HOME_TAB, {
            screen: ROUTES.HOME_STACK,
            params: {
              screen: ROUTES.APARTMENT_LIST,
            },
          })
        }
        isActive={false}
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
