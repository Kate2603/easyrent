import React from "react";
import { View, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import PaymentForm from "../components/PaymentForm";
import { ROUTES } from "../constants/ROUTES";
import SectionTitle from "../components/SectionTitle";

export default function PaymentScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const { apartmentId, bookingData } = route.params;

  const handlePaymentSubmit = (paymentData) => {
    console.log("Оплата:", paymentData);
    console.log("Бронювання:", bookingData);
    console.log("Квартира:", apartmentId);

    navigation.navigate(ROUTES.SUCCESS);
  };

  return (
    <View style={styles.container}>
      <SectionTitle>Оплата для квартири №{apartmentId}</SectionTitle>
      <PaymentForm onSubmit={handlePaymentSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
});
