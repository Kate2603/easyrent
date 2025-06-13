import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const filters = ["Ціна", "Тип", "Рейтинг"];

const FilterChips = ({ onFilterSelect }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (filter) => {
    setSelected(filter);
    if (onFilterSelect) onFilterSelect(filter);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[styles.chip, selected === filter && styles.selected]}
          onPress={() => handleSelect(filter)}
        >
          <Text
            style={[styles.text, selected === filter && styles.selectedText]}
          >
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginRight: 10,
  },
  selected: {
    backgroundColor: "#007AFF",
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  selectedText: {
    color: "#fff",
  },
});

export default FilterChips;
