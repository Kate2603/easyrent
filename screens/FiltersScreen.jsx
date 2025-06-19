import React from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, selectFilters } from "../redux/filtersSlice";
import SearchForm from "../components/SearchForm";
import FilterChips from "../components/FilterChips";
import CustomButton from "../components/CustomButton";

export default function FiltersScreen() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const handleSearchSubmit = (formData) => {
    dispatch(setFilters({ ...formData, page: 1 }));
  };

  return (
    <View style={styles.container}>
      <SearchForm
        initialCity={filters.city}
        initialAddressLine1={filters.addressLine1}
        initialPropertyType={filters.propertyType}
        onSubmit={handleSearchSubmit}
      />

      <FilterChips />

      <View style={styles.buttonWrapper}>
        <CustomButton
          title="Застосувати"
          onPress={() => handleSearchSubmit(filters)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    justifyContent: "space-between",
  },
  buttonWrapper: {
    marginTop: 16,
  },
});
