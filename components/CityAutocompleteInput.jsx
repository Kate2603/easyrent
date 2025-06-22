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
import { useTheme } from "../contexts/ThemeContext";
import { useStrings } from "../hooks/useStrings";
import { COLORS } from "../constants/colors";

export default function CityAutocompleteInput({ onCitySelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const { theme } = useTheme();
  const { strings } = useStrings();

  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkBackground;
  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;
  const inputBg = theme === "light" ? "#fff" : "#1e1e1e";
  const borderColor = theme === "light" ? "#ccc" : "#555";
  const listBg = theme === "light" ? "#fff" : "#2a2a2a";
  const itemBorder = theme === "light" ? "#eee" : "#444";

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

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
          { backgroundColor: inputBg, borderColor, color: textColor },
        ]}
        placeholder={strings.enterCityPlaceholder}
        placeholderTextColor={theme === "light" ? "#999" : "#888"}
        value={query}
        onChangeText={setQuery}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) =>
            item.id?.toString() || `${item.name}-${item.state}`
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.item, { borderBottomColor: itemBorder }]}
              onPress={() => handleSelect(item)}
            >
              <Text style={{ color: textColor }}>
                {item.name}, {item.state}
              </Text>
            </TouchableOpacity>
          )}
          style={[styles.list, { backgroundColor: listBg, borderColor }]}
          keyboardShouldPersistTaps="handled"
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
