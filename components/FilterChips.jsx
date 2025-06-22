import React from "react";
import { FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, selectFilters } from "../redux/filtersSlice";
import { useThemeColors } from "../hooks/useThemeColors";
import { useLocale } from "../contexts/LocaleContext";

const SORT_LABELS = {
  uk: {
    formattedAddress: "Адреса",
    propertyType: "Тип",
    city: "Місто",
  },
  en: {
    formattedAddress: "Address",
    propertyType: "Type",
    city: "City",
  },
};

export default function FilterChips() {
  const dispatch = useDispatch();
  const { filterSort } = useSelector(selectFilters);
  const { locale } = useLocale();
  const { chipActiveBg, chipActiveText, backgroundColor } = useThemeColors();

  const labels = SORT_LABELS[locale] || SORT_LABELS["uk"];

  const chipInactiveBg = backgroundColor === "#ffffff" ? "#eee" : "#444";
  const chipInactiveText = backgroundColor === "#ffffff" ? "#333" : "#eee";

  const SORT_KEYS = Object.keys(labels);

  const handlePress = (key) => {
    if (key !== filterSort) {
      dispatch(setFilters({ filterSort: key }));
    }
  };

  const renderChip = ({ item: key }) => {
    const isActive = key === filterSort;
    return (
      <TouchableOpacity
        key={key}
        onPress={() => handlePress(key)}
        style={[
          styles.chip,
          { backgroundColor: isActive ? chipActiveBg : chipInactiveBg },
        ]}
        accessibilityRole="button"
        accessibilityState={{ selected: isActive }}
      >
        <Text
          style={[
            styles.text,
            {
              color: isActive ? chipActiveText : chipInactiveText,
              fontWeight: isActive ? "600" : "400",
            },
          ]}
        >
          {labels[key]}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal
      data={SORT_KEYS}
      keyExtractor={(key) => key}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.container, { backgroundColor }]}
      renderItem={renderChip}
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
    marginRight: 10,
  },
  text: {
    fontSize: 13,
  },
});
