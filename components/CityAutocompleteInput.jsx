import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { fetchCitySuggestions } from "../api/citiesApi";

export default function CityAutocompleteInput({ onCitySelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Дебаунс: оновлюємо debouncedQuery через 500 мс після останнього введення
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  // Запит до API при зміні debouncedQuery, якщо довжина >= 2
  useEffect(() => {
    if (debouncedQuery.length < 2) return;
    fetchCitySuggestions(debouncedQuery)
      .then(setSuggestions)
      .catch((e) => {
        console.error("Autocomplete error:", e);
        setSuggestions([]);
      });
  }, [debouncedQuery]);

  // Вибір міста зі списку
  const handleSelect = (city) => {
    setQuery(`${city.name}, ${city.state}`);
    setSuggestions([]);
    if (onCitySelect) onCitySelect(city);
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder="Введіть місто (наприклад: New York)"
        value={query}
        onChangeText={setQuery}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item, idx) => `${item.name}-${idx}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSelect(item)}
            >
              <Text>
                {item.name}, {item.state}
              </Text>
            </TouchableOpacity>
          )}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16, zIndex: 10 },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  list: {
    maxHeight: 150,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 4,
  },
  item: {
    padding: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
});
