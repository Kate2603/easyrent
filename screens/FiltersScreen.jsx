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
import { useThemeColors } from "../hooks/useThemeColors"; // імпорт хука
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

export default function FiltersScreen() {
  const dispatch = useDispatch();
  const { filterSort } = useSelector(selectFilters);
  const colors = useThemeColors(); // отримуємо кольори
  const { locale } = useLocale();

  const labels = SORT_LABELS[locale] || SORT_LABELS.uk;

  const handleSelect = (filterKey) => {
    if (filterKey !== filterSort) {
      dispatch(setFilters({ filterSort: filterKey, page: 1 }));
    }
  };

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.backgroundColor }]}>
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
              title={labels[item] || item}
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
