import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Header = ({ title, onBack }) => {
  return (
    <View style={styles.container}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Header;
