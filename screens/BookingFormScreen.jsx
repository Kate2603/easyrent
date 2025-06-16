import React from "react";
import { View, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import BookingForm from "../components/BookingForm";
import SectionTitle from "../components/SectionTitle";
import { ROUTES } from "../constants/ROUTES";

export default function BookingFormScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const { id } = route.params || {};

  if (!id) {
    return (
      <View style={styles.container}>
        <SectionTitle>Квартира не знайдена</SectionTitle>
      </View>
    );
  }

  const handleBookingSubmit = (formData) => {
    navigation.navigate(ROUTES.PAYMENT, {
      apartmentId: id,
      bookingData: formData,
      title: `Оплата за квартиру №${id}`,
    });
  };

  return (
    <View style={styles.container}>
      <SectionTitle>Форма бронювання №{id}</SectionTitle>
      <BookingForm onSubmit={handleBookingSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
});
