import React, { useMemo } from "react";
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
import { useThemeColors } from "../hooks/useThemeColors";
import { useLocale } from "../contexts/LocaleContext";

const STRINGS = {
  uk: {
    apartmentNotFound: "Квартира не знайдена",
    bookingFormTitle: (id) => `Форма бронювання №${id}`,
    paymentTitle: (id) => `Оплата за квартиру №${id}`,
  },
  en: {
    apartmentNotFound: "Apartment not found",
    bookingFormTitle: (id) => `Booking form №${id}`,
    paymentTitle: (id) => `Payment for apartment №${id}`,
  },
};

export default function BookingFormScreen() {
  const { backgroundColor, textColor } = useThemeColors();
  const { locale } = useLocale();
  const navigation = useNavigation();
  const route = useRoute();

  const strings = useMemo(() => STRINGS[locale] || STRINGS.uk, [locale]);

  const id = route?.params?.id;

  const handleBookingSubmit = (formData) => {
    navigation.navigate(ROUTES.PAYMENT, {
      apartmentId: id,
      title: strings.paymentTitle(id),
    });
  };

  if (!id) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <SectionTitle style={{ color: textColor }} accessibilityRole="header">
          {strings.apartmentNotFound}
        </SectionTitle>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={[styles.scroll, { backgroundColor }]}
        keyboardShouldPersistTaps="handled"
      >
        <SectionTitle style={{ color: textColor }} accessibilityRole="header">
          {strings.bookingFormTitle(id)}
        </SectionTitle>
        <BookingForm onSubmit={handleBookingSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    padding: 20,
  },
});
