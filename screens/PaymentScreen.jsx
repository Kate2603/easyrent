import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectBookingData } from "../redux/bookingFormSlice";
import PaymentForm from "../components/PaymentForm";
import { ROUTES } from "../constants/ROUTES";
import SectionTitle from "../components/SectionTitle";
import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";

export default function PaymentScreen() {
  const { theme } = useTheme();
  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkBackground;
  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;
  const secondaryTextColor = theme === "light" ? "#555" : "#aaa";

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
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <SectionTitle style={{ color: textColor }}>{title}</SectionTitle>

        <PaymentForm onSubmit={handlePaymentSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
