import React from "react";
import { FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, selectFilters } from "../redux/filtersSlice";

// Мапа локалізованих назв до API-полів
const SORT_MAP = {
  Адреса: "formattedAddress",
  Тип: "propertyType",
  Місто: "city",
};

const SORT_OPTIONS = Object.keys(SORT_MAP);

export default function FilterChips() {
  const dispatch = useDispatch();
  const { filterSort } = useSelector(selectFilters);

  const handlePress = (option) => {
    const mappedValue = SORT_MAP[option];
    if (mappedValue !== filterSort) {
      dispatch(setFilters({ filterSort: mappedValue }));
    }
  };

  return (
    <FlatList
      horizontal
      data={SORT_OPTIONS}
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => {
        const isActive = SORT_MAP[item] === filterSort;
        return (
          <TouchableOpacity
            style={[styles.chip, isActive && styles.activeChip]}
            onPress={() => handlePress(item)}
          >
            <Text style={[styles.text, isActive && styles.activeText]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: "#eee",
    marginRight: 10,
  },
  activeChip: {
    backgroundColor: "#007AFF",
  },
  text: {
    fontSize: 13,
    color: "#333",
  },
  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
});
