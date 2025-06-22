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
import { useThemeColors } from "../hooks/useThemeColors";
import { useStrings } from "../hooks/useStrings";

export default function CityAutocompleteInput({ onCitySelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const { colors, isLight } = useThemeColors();
  const { strings } = useStrings();

  // Дебаунс введення (500мс)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(handler);
  }, [query]);

  // Запит на автопідказки при debouncedQuery > 1 символ
  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setSuggestions([]);
      return;
    }
    fetchCitySuggestions(debouncedQuery)
      .then(setSuggestions)
      .catch((e) => {
        console.error("Autocomplete error:", e);
        setSuggestions([]);
      });
  }, [debouncedQuery]);

  const handleSelect = (city) => {
    setQuery(`${city.name}, ${city.state}`);
    setSuggestions([]);
    if (onCitySelect) onCitySelect(city);
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isLight ? "#fff" : "#1e1e1e",
            borderColor: isLight ? "#ccc" : "#555",
            color: colors.text,
          },
        ]}
        placeholder={strings.enterCityPlaceholder}
        placeholderTextColor={isLight ? "#999" : "#888"}
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
        autoCapitalize="words"
        keyboardAppearance={isLight ? "light" : "dark"}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) =>
            item.id?.toString() || `${item.name}-${item.state}`
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.item,
                { borderBottomColor: isLight ? "#eee" : "#444" },
              ]}
              onPress={() => handleSelect(item)}
              activeOpacity={0.7}
            >
              <Text style={{ color: colors.text }}>
                {item.name}, {item.state}
              </Text>
            </TouchableOpacity>
          )}
          style={[
            styles.list,
            {
              backgroundColor: isLight ? "#fff" : "#2a2a2a",
              borderColor: isLight ? "#ccc" : "#555",
            },
          ]}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16, zIndex: 10 },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  list: {
    maxHeight: 150,
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 4,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
  },
});
