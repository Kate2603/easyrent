import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";

const SearchForm = ({ onSubmit }) => {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");

  const handleSearch = () => {
    if (onSubmit) {
      onSubmit({ city, date, guests });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Місто"
        value={city}
        onChangeText={setCity}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Дата"
        value={date}
        onChangeText={setDate}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Кількість гостей"
        keyboardType="numeric"
        value={guests}
        onChangeText={setGuests}
        placeholderTextColor="#999"
      />
      <CustomButton title="Знайти" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 12,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#222",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
});

export default SearchForm;
