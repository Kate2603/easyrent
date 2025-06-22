import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import ApartmentCard from "../components/ApartmentCard";
import SectionTitle from "../components/SectionTitle";
import { useSelector, useDispatch } from "react-redux";
import { selectFilters } from "../redux/filtersSlice";
import {
  fetchApartments,
  selectApartments,
  selectLoading,
} from "../redux/apartmentsSlice";
import { useThemeColors } from "../hooks/useThemeColors";
import { COLORS } from "../constants/colors";
import FiltersScreen from "./FiltersScreen";

export default function SearchScreen() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const apartments = useSelector(selectApartments);
  const loading = useSelector(selectLoading);

  const { backgroundColor, textColor } = useThemeColors();

  const [filtersVisible, setFiltersVisible] = useState(false);

  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchApartments(filters));
  }, [dispatch, filters]);

  const toggleFilters = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFiltersVisible((prev) => !prev);
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor }]}>
        <Text style={{ color: textColor }}>Завантаження...</Text>
      </View>
    );
  }

  if (apartments.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor }]}>
        <Text style={{ color: textColor }}>Квартири не знайдені</Text>
        <TouchableOpacity onPress={toggleFilters} style={styles.toggleBtn}>
          <Text style={styles.toggleBtnText}>
            {filtersVisible ? "Сховати фільтри" : "Показати фільтри"}
          </Text>
        </TouchableOpacity>
        {filtersVisible && <FiltersScreen />}
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity onPress={toggleFilters} style={styles.toggleBtn}>
        <Text style={styles.toggleBtnText}>
          {filtersVisible ? "Сховати фільтри" : "Показати фільтри"}
        </Text>
      </TouchableOpacity>

      {filtersVisible && <FiltersScreen />}

      <SectionTitle style={{ color: textColor }}>
        Результати пошуку
      </SectionTitle>

      <FlatList
        data={apartments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ApartmentCard apartment={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleBtn: {
    marginVertical: 12,
    padding: 8,
    backgroundColor: COLORS.primaryLight, // Можна винести в useThemeColors, якщо потрібно
    borderRadius: 6,
  },
  toggleBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
