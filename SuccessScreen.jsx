import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const SuccessScreen = ({ onReturn }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Дякуємо за бронювання!</Text>
      <Text style={styles.message}>
        Ми надіслали вам підтвердження на електронну пошту.
      </Text>
      <Button title="Повернутись на головну" onPress={onReturn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 20,
    backgroundColor: "#e8f5e9",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2e7d32",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
});

export default SuccessScreen;
