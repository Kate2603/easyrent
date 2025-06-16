import React from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { setFilter, selectSelectedFilter } from "../redux/filtersSlice";
import CustomButton from "../components/CustomButton";
import SectionTitle from "../components/SectionTitle";

const filters = ["Ціна", "Тип", "Рейтинг"];

export default function FiltersScreen() {
  const dispatch = useDispatch();
  const selected = useSelector(selectSelectedFilter);
  const navigation = useNavigation();

  const handleSelect = (filter) => {
    dispatch(setFilter(filter));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <SectionTitle>Фільтрувати за:</SectionTitle>

      {filters.map((filter) => (
        <View key={filter} style={styles.buttonWrapper}>
          <CustomButton
            title={filter}
            onPress={() => handleSelect(filter)}
            isActive={selected === filter}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  buttonWrapper: {
    marginBottom: 12,
  },
});
