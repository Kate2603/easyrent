import React from "react";
import { Text, StyleSheet } from "react-native";

export default function SectionTitle({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#007AFF",
  },
});
