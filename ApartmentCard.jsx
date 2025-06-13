import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ApartmentCard = ({
  imageUrl = "https://via.placeholder.com/300x200",
  title = "Затишна квартира в центрі",
  price = "₴1,200/ніч",
  rating = 4.5,
  reviews = 32,
}) => (
  <View style={styles.card}>
    <Image source={{ uri: imageUrl }} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.ratingRow}>
        <Icon name="star" size={16} color="#FFD700" />
        <Text style={styles.rating}>
          {rating} ({reviews})
        </Text>
      </View>
      <Text style={styles.price}>{price}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: "#666",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
});

export default ApartmentCard;
