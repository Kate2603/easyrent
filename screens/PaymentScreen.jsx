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

  const route = useRoute();
  const navigation = useNavigation();
  const bookingData = useSelector(selectBookingData);
  const { apartmentId, title } = route.params;

  const handlePaymentSubmit = (paymentData) => {
    console.log("✅ Оплата:", paymentData);
    console.log("📄 Бронювання:", bookingData);
    console.log("🏠 Квартира:", apartmentId);
    navigation.navigate(ROUTES.SUCCESS);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <KeyboardAvoidingView
        style={[styles.container]}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
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
  container: {
    flex: 1,
  },
});
