import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SectionTitle from "../components/SectionTitle";

export default function ApartmentCard({ apartment, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <SectionTitle>{apartment.title}</SectionTitle>
      <Text style={styles.text}>Тип: {apartment.type}</Text>
      <Text style={styles.text}>Ціна: {apartment.price} ₴</Text>
      <Text style={styles.text}>Рейтинг: {apartment.rating}</Text>
    </TouchableOpacity>
  );
}

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
