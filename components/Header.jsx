import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Header = ({ title, onBack }) => {
  return (
    <View style={styles.container}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="chevron-back" size={26} color="#006FFD" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    marginRight: 12,
    padding: 6,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#006FFD",
  },
});

export default Header;
