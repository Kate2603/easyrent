import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SectionTitle from "./SectionTitle";

const ApartmentCard = React.memo(function ApartmentCard({
  apartment,
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <SectionTitle>
        {apartment.formattedAddress || "Адреса відсутня"}
      </SectionTitle>

      <Text style={styles.text}>
        Тип: {apartment.propertyType || "Невідомий"}
      </Text>

      {apartment.yearBuilt && (
        <Text style={styles.text}>Рік побудови: {apartment.yearBuilt}</Text>
      )}
    </TouchableOpacity>
  );
});

export default ApartmentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f0f4f8",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
});
