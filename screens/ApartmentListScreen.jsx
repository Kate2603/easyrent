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
import { useLocale } from "../contexts/LocaleContext";

const STRINGS = {
  uk: {
    noApartments: "😔 Квартир не знайдено",
    allLoaded: "Завантажено всі",
  },
  en: {
    noApartments: "😔 No apartments found",
    allLoaded: "All loaded",
  },
};

export default function ApartmentListScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const apartments = useSelector(selectApartments);
  const isLoading = useSelector(selectApartmentsLoading);
  const hasMore = useSelector(selectApartmentsHasMore);
  const filters = useSelector(selectFilters);

  const { theme } = useTheme();
  const { locale } = useLocale();

  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkBackground;
  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;
  const secondaryTextColor = theme === "light" ? "#555" : "#aaa";

  const strings = STRINGS[locale] || STRINGS.uk;

  // Виклик fetchApartments — залежить не тільки від page, а й від усіх фільтрів
  useEffect(() => {
    dispatch(
      fetchApartments({
        page: filters.page,
        city: filters.city,
        propertyType: filters.propertyType,
      })
    );
  }, [dispatch, filters.page, filters.city, filters.propertyType]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      dispatch(incrementPage());
    }
  }, [dispatch, isLoading, hasMore]);

  const handleRefresh = useCallback(() => {
    dispatch(
      fetchApartments({
        page: 1,
        city: filters.city,
        propertyType: filters.propertyType,
      })
    );
  }, [dispatch, filters.city, filters.propertyType]);

  const handleCitySelect = useCallback(
    (cityObj) => {
      dispatch(setCity(cityObj.name));
      dispatch(setStateCode(cityObj.state));
    },
    [dispatch]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <ApartmentCard
        apartment={item}
        locale={locale}
        onPress={() =>
          navigation.navigate(ROUTES.APARTMENT_DETAILS, {
            apartmentId: item.id,
          })
        }
      />
    ),
    [navigation, locale]
  );

  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: secondaryTextColor }]}>
          {strings.noApartments}
        </Text>
      </View>
    ),
    [secondaryTextColor, strings.noApartments]
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <LocationAutoDetect />
      <CityAutocompleteInput onCitySelect={handleCitySelect} />

      <View style={styles.filtersWrapper}>
        <FilterChips />
      </View>

      <FlatList
        data={apartments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.listContent,
          apartments.length === 0 && { flexGrow: 1, justifyContent: "center" },
        ]}
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
        // Забезпечує плавність прокрутки
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={21}
      />

      {!hasMore && apartments.length > 0 && (
        <View style={styles.footer}>
          <CustomButton
            title={strings.allLoaded}
            disabled
            accessibilityLabel={strings.allLoaded}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filtersWrapper: {
    marginBottom: 8,
    paddingHorizontal: 16,
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
    textAlign: "center",
  },
});
