import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import ApartmentCard from "../components/ApartmentCard";
import SectionTitle from "../components/SectionTitle";
import { useSelector, useDispatch } from "react-redux";
import { selectFilters } from "../redux/filtersSlice";
import {
  fetchApartments,
  selectApartments,
  selectLoading,
} from "../redux/apartmentsSlice";
import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";

export default function SearchScreen() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const apartments = useSelector(selectApartments);
  const loading = useSelector(selectLoading);
  const { theme } = useTheme();

  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkBackground;

  useEffect(() => {
    // Виклик пошуку квартир з урахуванням фільтрів
    dispatch(fetchApartments(filters));
  }, [dispatch, filters]);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor }]}>
        <Text style={{ color: theme === "light" ? "#000" : "#fff" }}>
          Завантаження...
        </Text>
      </View>
    );
  }

  if (apartments.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor }]}>
        <Text style={{ color: theme === "light" ? "#000" : "#fff" }}>
          Квартири не знайдені
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <SectionTitle>Результати пошуку</SectionTitle>

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
});
