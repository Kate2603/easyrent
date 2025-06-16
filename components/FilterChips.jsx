import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import SectionTitle from "../components/SectionTitle";
import CustomButton from "../components/CustomButton";

const filters = ["Ціна", "Тип", "Рейтинг"];

const FilterChips = ({ onFilterSelect }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (filter) => {
    setSelected(filter);
    if (onFilterSelect) onFilterSelect(filter);
  };

  return (
    <View style={styles.wrapper}>
      <SectionTitle>Фільтрувати за:</SectionTitle>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {filters.map((filter) => (
          <View key={filter} style={styles.chipWrapper}>
            <CustomButton
              title={filter}
              onPress={() => handleSelect(filter)}
              isActive={selected === filter}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  container: {
    paddingHorizontal: 16,
    gap: 10,
  },
  chipWrapper: {
    marginRight: 8,
  },
});

export default FilterChips;
