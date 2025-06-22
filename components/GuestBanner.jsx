import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function GuestBanner() {
  return (
    <View style={styles.banner}>
      <Text style={styles.text}>
        Ви переглядаєте як гість. Деякі функції можуть бути недоступні.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#FFC107",
    padding: 10,
    alignItems: "center",
    zIndex: 9999,
  },
  text: {
    color: "#000",
    fontSize: 14,
    textAlign: "center",
  },
});
