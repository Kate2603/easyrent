import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import CustomButton from "../components/CustomButton";
import SectionTitle from "../components/SectionTitle";
import { useStrings } from "../hooks/useStrings";
import { useThemeColors } from "../hooks/useThemeColors";

import {
  fetchApartmentById,
  selectSelectedApartment,
  selectSelectedApartmentLoading,
  selectSelectedApartmentError,
} from "../redux/apartmentsSlice";

import { ROUTES } from "../constants/ROUTES";
import { formatDate } from "../utils/dateUtils";
import LoginRequiredWrapper from "../components/LoginRequiredWrapper";

export default function ApartmentDetailsScreen() {
  const { apartmentId } = useRoute().params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const strings = useStrings();
  const { backgroundColor, textColor, cardColor } = useThemeColors();

  const apartment = useSelector(selectSelectedApartment);
  const loading = useSelector(selectSelectedApartmentLoading);
  const error = useSelector(selectSelectedApartmentError);

  useEffect(() => {
    dispatch(fetchApartmentById(apartmentId));
  }, [apartmentId, dispatch]);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor }]}>
        <ActivityIndicator size="large" color={cardColor} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor }]}>
        <Text style={[styles.messageText, { color: textColor }]}>
          {strings.loadingError}: {error}
        </Text>
      </View>
    );
  }

  if (!apartment) {
    return (
      <View style={[styles.center, { backgroundColor }]}>
        <Text style={[styles.messageText, { color: textColor }]}>
          {strings.apartmentNotFound}
        </Text>
      </View>
    );
  }

  const createdAtFormatted = apartment.createdAt
    ? formatDate(apartment.createdAt, strings.locale)
    : strings.unknown || (strings.locale === "uk" ? "невідомо" : "unknown");

  // Використовуємо прозорість для вторинного тексту (наприклад 80%)
  const secondaryTextColor = textColor + "CC";

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <SectionTitle style={{ color: textColor }}>
        {apartment.formattedAddress || strings.addressMissing}
      </SectionTitle>

      <View style={styles.detailRow}>
        <Text style={[styles.detailText, { color: secondaryTextColor }]}>
          {strings.type}: {apartment.propertyType || strings.unknown}
        </Text>
      </View>

      {apartment.yearBuilt && (
        <View style={styles.detailRow}>
          <Text style={[styles.detailText, { color: secondaryTextColor }]}>
            {strings.yearBuilt}: {apartment.yearBuilt}
          </Text>
        </View>
      )}

      <View style={styles.detailRow}>
        <Text style={[styles.detailText, { color: secondaryTextColor }]}>
          {strings.publishedOn}: {createdAtFormatted}
        </Text>
      </View>

      <View style={styles.buttonWrapper}>
        <LoginRequiredWrapper>
          <CustomButton
            title={strings.bookNow}
            onPress={() =>
              navigation.navigate(ROUTES.BOOKING, { id: apartment.id })
            }
            accessibilityLabel={strings.bookNow}
          />
        </LoginRequiredWrapper>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageText: {
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
  },
  buttonWrapper: {
    marginTop: 24,
    alignItems: "center",
  },
});
