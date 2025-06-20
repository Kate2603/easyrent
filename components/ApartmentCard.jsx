import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SectionTitle from "./SectionTitle";
import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";

const ApartmentCard = React.memo(function ApartmentCard({
  apartment,
  onPress,
}) {
  const { theme } = useTheme();

  const backgroundColor =
    theme === "light" ? COLORS.lightCard : COLORS.darkCard;
  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;
  const shadowColor = theme === "light" ? "#000" : "#000";

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor,
          shadowColor,
        },
      ]}
      onPress={onPress}
    >
      <SectionTitle>
        {apartment.formattedAddress || "Адреса відсутня"}
      </SectionTitle>

      <Text style={[styles.text, { color: textColor }]}>
        Тип: {apartment.propertyType || "Невідомий"}
      </Text>

      {apartment.yearBuilt && (
        <Text style={[styles.text, { color: textColor }]}>
          Рік побудови: {apartment.yearBuilt}
        </Text>
      )}
    </TouchableOpacity>
  );
});

export default ApartmentCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
});
