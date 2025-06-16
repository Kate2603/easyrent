import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectSelectedFilter } from "../redux/filtersSlice";
import { mockApartments } from "../data/apartments";
import { Ionicons } from "@expo/vector-icons";
import SectionTitle from "../components/SectionTitle";
import CustomButton from "../components/CustomButton";
import { ROUTES } from "../constants/ROUTES";

export default function ApartmentListScreen() {
  const navigation = useNavigation();
  const selectedFilter = useSelector(selectSelectedFilter);

  const filteredApartments = React.useMemo(() => {
    const sorted = [...mockApartments];
    switch (selectedFilter) {
      case "Ціна":
        return sorted.sort((a, b) => a.price - b.price);
      case "Рейтинг":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "Тип":
        return sorted.sort((a, b) => a.type.localeCompare(b.type));
      default:
        return sorted;
    }
  }, [selectedFilter]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SectionTitle>Квартири</SectionTitle>

      {filteredApartments.map((apt) => (
        <TouchableOpacity
          key={apt.id}
          style={styles.card}
          onPress={() =>
            navigation.navigate(ROUTES.HOME_TAB, {
              screen: ROUTES.HOME_STACK,
              params: {
                screen: ROUTES.APARTMENT_DETAILS,
                params: { id: apt.id },
              },
            })
          }
        >
          <Image source={{ uri: apt.image }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title}>{apt.title}</Text>
            <View style={styles.row}>
              <Ionicons name={apt.icon} size={18} color="#007AFF" />
              <Text style={styles.type}>{apt.type}</Text>
            </View>
            <Text style={styles.price}>{apt.price} ₴ / ніч</Text>
            <Text style={styles.rating}>⭐ {apt.rating}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <CustomButton
        title="Відкрити фільтри"
        onPress={() =>
          navigation.navigate(ROUTES.HOME_TAB, {
            screen: ROUTES.HOME_STACK,
            params: { screen: ROUTES.FILTERS },
          })
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EEE",
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    color: "#007AFF",
  },
  rating: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
