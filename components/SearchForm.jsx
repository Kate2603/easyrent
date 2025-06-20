import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import SectionTitle from "./SectionTitle";
import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";

export default function SearchForm({
  initialCity = "",
  initialAddressLine1 = "",
  initialPropertyType = "",
  onSubmit,
}) {
  const [city, setCity] = useState(initialCity);
  const [addressLine1, setAddressLine1] = useState(initialAddressLine1);
  const [propertyType, setPropertyType] = useState(initialPropertyType);

  const { theme } = useTheme();

  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;
  const borderColor = theme === "light" ? "#ccc" : "#555";
  const placeholderColor = theme === "light" ? "#999" : "#aaa";
  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkCard;

  const handleSubmit = () => {
    onSubmit({
      city,
      addressLine1,
      propertyType,
    });
  };

  return (
    <View>
      <SectionTitle>Параметри пошуку</SectionTitle>

      <TextInput
        style={[
          styles.input,
          { borderColor, color: textColor, backgroundColor },
        ]}
        placeholder="Місто"
        placeholderTextColor={placeholderColor}
        value={city}
        onChangeText={setCity}
        onEndEditing={handleSubmit}
      />

      <TextInput
        style={[
          styles.input,
          { borderColor, color: textColor, backgroundColor },
        ]}
        placeholder="Тип житла"
        placeholderTextColor={placeholderColor}
        value={propertyType}
        onChangeText={setPropertyType}
        onEndEditing={handleSubmit}
      />

      <TextInput
        style={[
          styles.input,
          { borderColor, color: textColor, backgroundColor },
        ]}
        placeholder="Адреса"
        placeholderTextColor={placeholderColor}
        value={addressLine1}
        onChangeText={setAddressLine1}
        onEndEditing={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
});
