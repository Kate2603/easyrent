import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { mockApartments } from "../data/apartments";
import { ROUTES } from "../constants/ROUTES";
import CustomButton from "../components/CustomButton";
import SectionTitle from "../components/SectionTitle";

export default function ApartmentDetailsScreen() {
  const { id } = useRoute().params;
  const navigation = useNavigation();
  const apartment = mockApartments.find((apt) => apt.id === id);

  if (!apartment) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFoundText}>Квартира не знайдена</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: apartment.image }} style={styles.image} />

      <SectionTitle>{apartment.title}</SectionTitle>

      <View style={styles.detailRow}>
        <Ionicons name={apartment.icon} size={22} color="#007AFF" />
        <Text style={styles.detailText}>{apartment.type}</Text>
      </View>

      <Text style={styles.price}>Ціна: {apartment.price} ₴ / ніч</Text>
      <Text style={styles.rating}>⭐ Рейтинг: {apartment.rating}</Text>

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
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 8,
    color: "#444",
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "#007AFF",
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: "#888",
    marginBottom: 16,
  },
  buttonWrapper: {
    marginTop: 24,
    alignItems: "center",
  },
});
