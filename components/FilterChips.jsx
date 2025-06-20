import React from "react";
import { FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, selectFilters } from "../redux/filtersSlice";
import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";

const SORT_MAP = {
  Адреса: "formattedAddress",
  Тип: "propertyType",
  Місто: "city",
};

const SORT_OPTIONS = Object.keys(SORT_MAP);

export default function FilterChips() {
  const dispatch = useDispatch();
  const { filterSort } = useSelector(selectFilters);
  const { theme } = useTheme();

  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkBackground;
  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;
  const chipBg = theme === "light" ? "#eee" : "#444";
  const chipText = theme === "light" ? "#333" : "#eee";
  const chipActiveBg =
    theme === "light" ? COLORS.chipActiveBgLight : COLORS.chipActiveBgDark;
  const chipActiveText =
    theme === "light" ? COLORS.chipActiveTextLight : COLORS.chipActiveTextDark;

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
      contentContainerStyle={[styles.container, { backgroundColor }]}
      renderItem={({ item }) => {
        const isActive = SORT_MAP[item] === filterSort;
        return (
          <TouchableOpacity
            style={[
              styles.chip,
              { backgroundColor: isActive ? chipActiveBg : chipBg },
            ]}
            onPress={() => handlePress(item)}
          >
            <Text
              style={[
                styles.text,
                {
                  color: isActive ? chipActiveText : chipText,
                  fontWeight: isActive ? "600" : "400",
                },
              ]}
            >
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
    marginRight: 10,
  },
  text: {
    fontSize: 13,
  },
});
