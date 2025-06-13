import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";

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
      />
      <TextInput
        style={styles.input}
        placeholder="Дата"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Кількість гостей"
        keyboardType="numeric"
        value={guests}
        onChangeText={setGuests}
      />
      <Button title="Знайти" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
});

export default SearchForm;
