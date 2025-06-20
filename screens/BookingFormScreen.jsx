import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import BookingForm from "../components/BookingForm";
import SectionTitle from "../components/SectionTitle";
import { ROUTES } from "../constants/ROUTES";
import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";

export default function BookingFormScreen() {
  const { theme } = useTheme();
  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkBackground;

  const route = useRoute();
  const navigation = useNavigation();

  const { id } = route.params || {};

  if (!id) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <SectionTitle>Квартира не знайдена</SectionTitle>
      </View>
    );
  }

  const handleBookingSubmit = (formData) => {
    navigation.navigate(ROUTES.PAYMENT, {
      apartmentId: id,
      title: `Оплата за квартиру №${id}`,
    });
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 20, backgroundColor }}
      >
        <SectionTitle>Форма бронювання №{id}</SectionTitle>
        <BookingForm onSubmit={handleBookingSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
