import React from "react";
import { useSelector } from "react-redux";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../constants/ROUTES";

export default function LoginRequiredWrapper({ children }) {
  const user = useSelector((state) => state.user.data);
  const navigation = useNavigation();

  if (!user || user.role === "guest") {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Для цієї дії потрібно увійти в обліковий запис.
        </Text>
        <Button
          title="Увійти"
          onPress={() => navigation.navigate(ROUTES.LOGIN)}
        />
      </View>
    );
  }

  return children;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: { fontSize: 16, marginBottom: 12 },
});
