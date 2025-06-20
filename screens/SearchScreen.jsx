import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import CityAutocompleteInput from "../components/CityAutocompleteInput";
import SectionTitle from "../components/SectionTitle";
import CustomButton from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilters,
  selectFilters,
  FILTER_SORT_OPTIONS,
} from "../redux/filtersSlice";
import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";

export default function FiltersScreen() {
  const dispatch = useDispatch();
  const { filterSort } = useSelector(selectFilters);

  const { theme } = useTheme();

  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkBackground;

  const handleSelect = (filter) => {
    dispatch(setFilters({ filterSort: filter, page: 1 }));
  };

  return (
    <View style={[styles.wrapper, { backgroundColor }]}>
      <SectionTitle>Оберіть місто</SectionTitle>
      <CityAutocompleteInput />

      <SectionTitle>Фільтрувати за:</SectionTitle>

      <FlatList
        data={FILTER_SORT_OPTIONS}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.chipWrapper}>
            <CustomButton
              title={item}
              onPress={() => handleSelect(item)}
              isActive={item === filterSort}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  listContainer: {
    paddingVertical: 10,
  },
  chipWrapper: {
    marginBottom: 10,
  },
});
