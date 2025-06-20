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

import {
  fetchApartmentById,
  selectSelectedApartment,
  selectSelectedApartmentLoading,
  selectSelectedApartmentError,
} from "../redux/apartmentsSlice";

import { ROUTES } from "../constants/ROUTES";
import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";

export default function ApartmentDetailsScreen() {
  const { apartmentId } = useRoute().params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const apartment = useSelector(selectSelectedApartment);
  const loading = useSelector(selectSelectedApartmentLoading);
  const error = useSelector(selectSelectedApartmentError);

  const { theme } = useTheme();
  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkBackground;
  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;
  const secondaryTextColor = theme === "light" ? "#666" : "#aaa";

  useEffect(() => {
    dispatch(fetchApartmentById(apartmentId));
  }, [apartmentId]);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor }]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor }]}>
        <Text style={[styles.notFoundText, { color: textColor }]}>
          Помилка завантаження: {error}
        </Text>
      </View>
    );
  }

  if (!apartment) {
    return (
      <View style={[styles.center, { backgroundColor }]}>
        <Text style={[styles.notFoundText, { color: textColor }]}>
          Квартира не знайдена
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <SectionTitle style={{ color: textColor }}>
        {apartment.formattedAddress || "Адреса відсутня"}
      </SectionTitle>

      <View style={styles.detailRow}>
        <Text style={[styles.detailText, { color: secondaryTextColor }]}>
          Тип: {apartment.propertyType || "Невідомий"}
        </Text>
      </View>

      {apartment.yearBuilt && (
        <Text style={[styles.detailText, { color: secondaryTextColor }]}>
          Рік побудови: {apartment.yearBuilt}
        </Text>
      )}

      <View style={styles.buttonWrapper}>
        <CustomButton
          title="Забронювати"
          onPress={() =>
            navigation.navigate(ROUTES.BOOKING, { id: apartment.id })
          }
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 18,
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
