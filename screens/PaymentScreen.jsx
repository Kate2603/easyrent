import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { selectBookingData } from "../redux/bookingFormSlice";
import PaymentForm from "../components/PaymentForm";
import { ROUTES } from "../constants/ROUTES";
import SectionTitle from "../components/SectionTitle";
import { useThemeColors } from "../hooks/useThemeColors";

export default function PaymentScreen() {
  const { backgroundColor, textColor } = useThemeColors();
  const navigation = useNavigation();
  const route = useRoute();
  const { apartmentId, title } = route.params;

  const bookingData = useSelector(selectBookingData);

  const handlePaymentSubmit = (paymentData) => {
    console.log("✅ Оплата:", paymentData);
    console.log("📄 Бронювання:", bookingData);
    console.log("🏠 Квартира:", apartmentId);
    navigation.navigate(ROUTES.SUCCESS);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { backgroundColor }]}
          keyboardShouldPersistTaps="handled"
        >
          <SectionTitle style={{ color: textColor }}>{title}</SectionTitle>
          <PaymentForm
            onSubmit={handlePaymentSubmit}
            apartmentId={apartmentId}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
});
