import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import SectionTitle from "../components/SectionTitle";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchApartmentById,
  selectSelectedApartment,
  selectSelectedApartmentLoading,
  selectSelectedApartmentError,
} from "../redux/apartmentsSlice";
import { ROUTES } from "../constants/ROUTES";

export default function ApartmentDetailsScreen() {
  const { apartmentId } = useRoute().params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const apartment = useSelector(selectSelectedApartment);
  const loading = useSelector(selectSelectedApartmentLoading);
  const error = useSelector(selectSelectedApartmentError);

  useEffect(() => {
    dispatch(fetchApartmentById(apartmentId));
  }, [apartmentId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFoundText}>Помилка завантаження: {error}</Text>
      </View>
    );
  }

  if (!apartment) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFoundText}>Квартира не знайдена</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Якщо є фото — вивести, інакше не показувати */}
      {/* <Image source={{ uri: apartment.image }} style={styles.image} /> */}

      <SectionTitle>
        {apartment.formattedAddress || "Адреса відсутня"}
      </SectionTitle>

      <View style={styles.detailRow}>
        {/* Іконку можна замінити на стандартну або прибрати */}
        <Text style={styles.detailText}>
          Тип: {apartment.propertyType || "Невідомий"}
        </Text>
      </View>

      {apartment.yearBuilt && (
        <Text style={styles.detailText}>
          Рік побудови: {apartment.yearBuilt}
        </Text>
      )}

      {/* Ціна і рейтинг відсутні — прибрати або додати, якщо будуть */}
      {/* <Text style={styles.price}>Ціна: {apartment.price} ₴ / ніч</Text> */}
      {/* <Text style={styles.rating}>⭐ Рейтинг: {apartment.rating}</Text> */}

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
    backgroundColor: "#FFFFFF",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 18,
    color: "#333",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: "#444",
  },
  buttonWrapper: {
    marginTop: 24,
    alignItems: "center",
  },
});
