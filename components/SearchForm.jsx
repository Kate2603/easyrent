import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import SectionTitle from "./SectionTitle";

export default function SearchForm({
  initialCity = "",
  initialAddressLine1 = "",
  initialPropertyType = "",
  onSubmit,
}) {
  const [city, setCity] = useState(initialCity);
  const [addressLine1, setAddressLine1] = useState(initialAddressLine1);
  const [propertyType, setPropertyType] = useState(initialPropertyType);

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
        style={styles.input}
        placeholder="Місто"
        value={city}
        onChangeText={setCity}
      />

      <TextInput
        style={styles.input}
        placeholder="Тип житла"
        value={propertyType}
        onChangeText={setPropertyType}
      />

      <TextInput
        style={styles.input}
        placeholder="Адреса"
        value={addressLine1}
        onChangeText={setAddressLine1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
});
