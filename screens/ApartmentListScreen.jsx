import React, { useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import LocationAutoDetect from "../components/LocationAutoDetect";
import CityAutocompleteInput from "../components/CityAutocompleteInput";
import ApartmentCard from "../components/ApartmentCard";
import FilterChips from "../components/FilterChips";
import CustomButton from "../components/CustomButton";

import {
  fetchApartments,
  selectApartments,
  selectApartmentsLoading,
  selectApartmentsHasMore,
} from "../redux/apartmentsSlice";

import {
  selectFilters,
  incrementPage,
  setCity,
  setStateCode,
} from "../redux/filtersSlice";

import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";
import { ROUTES } from "../constants/ROUTES";

export default function ApartmentListScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const apartments = useSelector(selectApartments);
  const isLoading = useSelector(selectApartmentsLoading);
  const hasMore = useSelector(selectApartmentsHasMore);
  const filters = useSelector(selectFilters);
  const { theme } = useTheme();

  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkBackground;
  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;
  const secondaryTextColor = theme === "light" ? "#555" : "#aaa";

  useEffect(() => {
    dispatch(fetchApartments(filters.page));
  }, [filters.page, filters.city, filters.propertyType]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      dispatch(incrementPage());
    }
  };

  const handleRefresh = () => {
    dispatch(fetchApartments(1));
  };

  const handleCitySelect = (cityObj) => {
    dispatch(setCity(cityObj.name));
    dispatch(setStateCode(cityObj.state));
  };

  const renderItem = useCallback(
    ({ item }) => (
      <ApartmentCard
        apartment={item}
        onPress={() =>
          navigation.navigate(ROUTES.APARTMENT_DETAILS, {
            apartmentId: item.id,
          })
        }
      />
    ),
    [navigation]
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: secondaryTextColor }]}>
        😔 Квартир не знайдено
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <LocationAutoDetect />
      <CityAutocompleteInput onCitySelect={handleCitySelect} />
      <View style={{ marginBottom: 8 }}>
        <FilterChips />
      </View>

      <FlatList
        data={apartments}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.6}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        ListFooterComponent={
          isLoading && hasMore ? (
            <ActivityIndicator
              size="large"
              color={
                theme === "light" ? COLORS.primaryLight : COLORS.primaryDark
              }
            />
          ) : null
        }
        ListEmptyComponent={renderEmpty}
      />

      {!hasMore && apartments.length > 0 && (
        <View style={styles.footer}>
          <CustomButton title="Завантажено всі" disabled />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  emptyContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
  },
});
