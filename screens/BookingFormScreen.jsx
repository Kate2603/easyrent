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
import { useThemeColors } from "../hooks/useThemeColors";
import { useLocale } from "../contexts/LocaleContext";
import LoginRequiredWrapper from "../components/LoginRequiredWrapper";
import { STRINGS } from "../locales/strings";

export default function BookingFormScreen() {
  const { backgroundColor, textColor } = useThemeColors();
  const { locale } = useLocale();
  const navigation = useNavigation();
  const route = useRoute();

  const strings = STRINGS[locale] || STRINGS.uk;

  const id = route?.params?.id;

  const handleBookingSubmit = (formData) => {
    navigation.navigate(ROUTES.PAYMENT, {
      apartmentId: id,
      title: strings.paymentTitle,
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
    <LoginRequiredWrapper>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Можна підкоригувати під свій header
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.scroll, { backgroundColor }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <SectionTitle style={{ color: textColor }} accessibilityRole="header">
            {strings.bookingFormTitle}
          </SectionTitle>
          <BookingForm onSubmit={handleBookingSubmit} />
        </ScrollView>
      </KeyboardAvoidingView>
    </LoginRequiredWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    flexGrow: 1,
  },
});
