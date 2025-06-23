import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CityAutocompleteInput from "../components/CityAutocompleteInput";
import SectionTitle from "../components/SectionTitle";
import CustomButton from "../components/CustomButton";

import {
  setFilters,
  selectFilters,
  FILTER_SORT_OPTIONS,
} from "../redux/filtersSlice";

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

export default function FiltersScreen() {
  const dispatch = useDispatch();
  const { filterSort } = useSelector(selectFilters);
  const colors = useThemeColors();
  const { locale } = useLocale();

  const labels = SORT_LABELS[locale] || SORT_LABELS.uk;

  const handleSelect = (filterKey) => {
    if (filterKey !== filterSort) {
      dispatch(setFilters({ filterSort: filterKey, page: 1 }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.backgroundColor }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <SectionTitle style={{ color: colors.textColor }}>
          {locale === "uk" ? "Оберіть місто" : "Select a city"}
        </SectionTitle>
        <View style={styles.inputWrapper}>
          <CityAutocompleteInput />
        </View>

        <SectionTitle style={{ color: colors.textColor }}>
          {locale === "uk" ? "Фільтрувати за:" : "Filter by:"}
        </SectionTitle>

        <FlatList
          data={FILTER_SORT_OPTIONS}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.chipWrapper}>
              <CustomButton
                title={labels[item] || item}
                onPress={() => handleSelect(item)}
                isActive={item === filterSort}
                activeBgColor={colors.chipActiveBg}
                activeTextColor={colors.chipActiveText}
                inactiveBgColor={colors.cardColor}
                inactiveTextColor={colors.textColor}
                style={{
                  borderColor: colors.borderColor,
                  paddingVertical: 12,
                  borderRadius: 12,
                }}
                textStyle={{
                  fontSize: 16,
                  fontWeight: "600",
                }}
              />
            </View>
          )}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  inputWrapper: {
    marginBottom: 24,
  },
  listContainer: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  chipWrapper: {
    marginBottom: 12,
  },
});
