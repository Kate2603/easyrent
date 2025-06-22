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

import Animated, { FadeIn } from "react-native-reanimated";

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
  resetApartments, // <--- added action to reset apartments on refresh (make sure you implement this in apartmentsSlice)
} from "../redux/apartmentsSlice";

import {
  selectFilters,
  incrementPage,
  setCity,
  setStateCode,
  resetPage, // <--- added action to reset page to 1 on filter change or refresh (implement in filtersSlice)
} from "../redux/filtersSlice";

import { useThemeColors } from "../hooks/useThemeColors";
import { useLocale } from "../contexts/LocaleContext";

import { ROUTES } from "../constants/ROUTES";

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

  const { backgroundColor, textColor, chipActiveText } = useThemeColors();
  const secondaryTextColor = textColor + "CC"; // 80% opacity for secondary text

  const { locale } = useLocale();
  const strings = STRINGS[locale] || STRINGS.uk;

  // Fetch apartments when filters.page, filters.city or filters.propertyType change
  useEffect(() => {
    dispatch(
      fetchApartments({
        page: filters.page,
        city: filters.city,
        propertyType: filters.propertyType,
      })
    );
  }, [dispatch, filters.page, filters.city, filters.propertyType]);

  // Load more apartments (pagination)
  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      dispatch(incrementPage());
    }
  }, [dispatch, isLoading, hasMore]);

  // Refresh list: reset page, clear apartments, then fetch page 1
  const handleRefresh = useCallback(() => {
    dispatch(resetPage()); // reset page to 1 in filtersSlice
    dispatch(resetApartments()); // clear apartments list in apartmentsSlice
    dispatch(
      fetchApartments({
        page: 1,
        city: filters.city,
        propertyType: filters.propertyType,
      })
    );
  }, [dispatch, filters.city, filters.propertyType]);

  // When city changes, set city and state code and reset page & apartments
  const handleCitySelect = useCallback(
    (cityObj) => {
      dispatch(setCity(cityObj.name));
      dispatch(setStateCode(cityObj.state));
      dispatch(resetPage());
      dispatch(resetApartments());
    },
    [dispatch]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <Animated.View entering={FadeIn.duration(300)} key={item.id.toString()}>
        <ApartmentCard
          apartment={item}
          locale={locale}
          onPress={() =>
            navigation.navigate(ROUTES.APARTMENT_DETAILS, {
              apartmentId: item.id,
            })
          }
        />
      </Animated.View>
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
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
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
            <ActivityIndicator size="large" color={chipActiveText} />
          ) : null
        }
        ListEmptyComponent={renderEmpty}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={21}
        removeClippedSubviews={false} // <-- set false to avoid animation issues
      />

      {!hasMore && apartments.length > 0 && (
        <View style={styles.footer}>
          <CustomButton
            title={strings.allLoaded}
            disabled
            accessibilityLabel={strings.allLoaded}
            style={{ minWidth: 150, paddingVertical: 14 }} // Add minWidth & padding to improve button size
            textStyle={{ fontSize: 16, fontWeight: "700" }}
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
